import {Component} from 'react';
import * as React from 'react';
import Mod from '../../../shared/models/Mod';
import {IPC} from '../../../shared/enums/IPC';
import {DB} from '../../../shared/enums/DB';
import Utils from '../../misc/Utils';

type props = {
    selectedMod: Mod;
};

type state = {
    isPlaying: boolean;
    isInstalled: boolean;
    isInstalling: boolean;
};

export default class MenuBar extends Component<props, state> {
    constructor(props: props) {
        super(props);

        this.state = {
            isPlaying: false,
            isInstalled: Utils.storeGet(DB.INSTALLED).includes(this.props.selectedMod.name),
            isInstalling: false
        };

        Utils.ipcRendererOn(IPC.PLAY, this.stardockLauncherClosed);
    }

    componentWillReceiveProps(nextProps: Readonly<props>) {
        this.setState({isInstalled: Utils.storeGet(DB.INSTALLED).includes(nextProps.selectedMod.name)});
    }

    stardockLauncherClosed = () => {
        this.setState({isPlaying: false});
    };

    handleClick = async () => {
        // If not installed, proceed to install the mod according to its InstallSteps
        if (!this.state.isInstalled) {
            // For each step, wait until the step completes then continue onto the next
            for (const step of this.props.selectedMod.steps) {
                await Utils.ipcRendererSendAsync(IPC.INSTALL, step);
            }

            // Mod has installed successfully, update its status
            Utils.addInstalledMod(this.props.selectedMod.name);
            this.setState({isInstalled: true});
        } else {
            this.setState({isPlaying: true});

            Utils.ipcRendererSend(IPC.PLAY, this.props.selectedMod);
        }
    };

    buttonText = () => {
        if (!this.state.isInstalled) {
            return 'Install';
        } else if (this.state.isInstalling) {
            return 'Installing...';
        }

        return this.state.isPlaying ? 'Playing...' : 'Play';
    };

    render() {
        return (
            <div className={'row mt-auto'}>
                <div className={'col text-right'}>
                    <button className={`btn btn-primary btn-lg`}
                            onClick={this.handleClick}
                            disabled={this.state.isPlaying || this.state.isInstalling}>
                        {this.buttonText()}
                    </button>
                </div>
            </div>
        );
    }
}