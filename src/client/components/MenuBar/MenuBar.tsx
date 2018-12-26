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
};

export default class MenuBar extends Component<props, state> {
    constructor(props: props) {
        super(props);

        this.state = {
            isPlaying: false,
            isInstalled: !!(Utils.storeGet(DB.INSTALLED) as string[]).find(modName => modName === this.props.selectedMod.name)
        };

        Utils.ipcRendererOn(IPC.PLAY, this.stardockLauncherClosed);
    }

    stardockLauncherClosed = () => {
        this.setState({isPlaying: false});
    };

    handleClick = () => {
        this.setState({isPlaying: true});

        Utils.ipcRendererSend(IPC.PLAY, this.props.selectedMod);
    };

    buttonText = () => {
        if (!this.state.isInstalled) {
            return 'Install';
        }

        return this.state.isPlaying ? 'Playing...' : 'Play';
    };

    render() {
        return (
            <div className={'row mt-auto'}>
                <div className={'col text-right'}>
                    <button className={`btn btn-primary btn-lg`}
                            onClick={this.handleClick}
                            disabled={this.state.isPlaying}>
                        {this.buttonText()}
                    </button>
                </div>
            </div>
        );
    }
}