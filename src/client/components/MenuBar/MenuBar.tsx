import * as React from 'react';
import {Component} from 'react';
import * as prettyBytes from 'pretty-bytes';
import InstallationProgress from '../../../interfaces/InstallationProgress';
import Logic from "../../Logic";
import Mod from "../../../models/Mod";
import {IPCEnum} from "../../../enums/IPCEnum";

interface props {
    selectedMod: Mod;
    selectedModWasInstalled: () => void;
    logic?: Logic;
}

interface state {
    buttonDisabled: boolean;
    installProgress?: InstallationProgress;
}

export default class MenuBar extends Component<props, state> {
    private readonly _logic: Logic;

    constructor(props: props) {
        super(props);

        this.state = {
            buttonDisabled: false
        };

        this._logic = this.props.logic || Logic.instance;
    }

    // play() {
    //     let enabledMods = new EnabledModsBuilder();
    //
    //     if (this.props.selectedMod.enabledModsName) enabledMods.addMod(this.props.selectedMod.enabledModsName);
    //
    //     if (this.props.selectedMod.subMods.length > 0) {
    //         this.props.selectedMod.subMods.forEach(subMod => subMod.isEnabled ? enabledMods.addMod(subMod.enabledModsName) : null);
    //     }
    //
    //     ipcRenderer.send(IPCEnum.PLAY, enabledMods.toString());
    //     ipcRenderer.on(IPCEnum.LAUNCHER_CLOSED, () => console.log("launcher closed!"));
    // }
    //
    // install = () => {
    //     this.setState({isDownloading: true, buttonText: "Installing"});
    //     ipcRenderer.send(IPCEnum.INSTALL, this.props.selectedMod);
    //
    //     ipcRenderer.on(IPCEnum.NEW_STEP, (event: any, step: number, numSteps: number) => this.setState({step: step, numSteps: numSteps, progressText: "", buttonDisabled: true, progressText: 0, fileSize: 0}));
    //     ipcRenderer.on(IPCEnum.DOWNLOAD_STARTED, (event: any, size: number) => this.setState({isDownloading: true, fileSize: size}));
    //     ipcRenderer.on(IPCEnum.DOWNLOAD_PROGRESSED, (event: any, newProgress: number) => this.setState({progressText: newProgress}));
    //     ipcRenderer.on(IPCEnum.DOWNLOAD_FINISHED, () => this.setState({progressText: "Download complete! Installing mod..."}));
    //     ipcRenderer.on(IPCEnum.INSTALLATION_FINISHED, () => {
    //         this.setState({isDownloading: false, buttonDisabled: false});
    //
    //         this.props.setModAsInstalled();
    //     });
    // };

    handleOnClick = async () => {
        this.setState({buttonDisabled: true});

        if (this.props.selectedMod.isInstalled) {
            await this._logic.launchStardock(this.props.selectedMod);
        } else {
            await this._logic.installMod(this.props.selectedMod, this.update);

            this.props.selectedModWasInstalled();
        }

        this.setState({buttonDisabled: false});
    };

    update = (progress: InstallationProgress) => {
        this.setState({installProgress: progress.type === IPCEnum.DOWNLOAD_FINISHED ? undefined : {...this.state.installProgress, ...progress}});
    };

    progressText = () => {
        // Thorough null check to appease the typescript gods
        if (this.state.installProgress
            && this.state.installProgress.receivedBytes
            && this.state.installProgress.totalBytes) {
            return this.state.installProgress.receivedBytes / this.state.installProgress.totalBytes * 100;
        }

        return 0;
    };

    progressBar = () => {
        // If there's no install progressText given, do not generate progressText bar
        if (!this.state.installProgress) return null;

        let progressText = `${this.progressText().toFixed(2)}% ` +
        `- ${prettyBytes(this.state.installProgress.receivedBytes || 0)}/${prettyBytes(this.state.installProgress.totalBytes || 0)} ` +
        `(Step ${this.state.installProgress.step} of ${this.props.selectedMod.installSteps.length})`;

        return (
            <React.Fragment>
                <p id="progress-text">{progressText}</p>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         style={{width: `${this.progressText()}%`}} role="progressbar"> </div>
                </div>
            </React.Fragment>
        );
    };

    buttonText = () => {
        if (this.props.selectedMod.isInstalled) {
            return "Play";
        } else if (!this.state.buttonDisabled) {
            return "Install";
        } else {
            return "Installing..."
        }
    };

    render() {
        return (
            <div className="row mt-auto">
                <div className="col-8">
                    {this.progressBar()}
                </div>

                <div className="col-4 text-right">
                    <button className="btn btn-default btn-lg" onClick={this.handleOnClick} disabled={this.state.buttonDisabled}>
                        {this.buttonText()}
                    </button>
                </div>
            </div>
        );
    }
}