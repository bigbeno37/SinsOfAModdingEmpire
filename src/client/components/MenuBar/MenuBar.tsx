import {Component} from 'react';
import * as React from 'react';
import * as prettyBytes from 'pretty-bytes';
import InstallationProgress from '../../../interfaces/InstallationProgress';

interface props {
    modIsInstalled: boolean
    play: () => void;
    install: () => void;
    installProgress?: InstallationProgress;
}

export default class MenuBar extends Component<props> {
    constructor(props: props) {
        super(props);
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
    //     ipcRenderer.on(IPCEnum.NEW_STEP, (event: any, step: number, numSteps: number) => this.setState({step: step, numSteps: numSteps, progressText: "", buttonDisabled: true, progress: 0, fileSize: 0}));
    //     ipcRenderer.on(IPCEnum.DOWNLOAD_STARTED, (event: any, size: number) => this.setState({isDownloading: true, fileSize: size}));
    //     ipcRenderer.on(IPCEnum.DOWNLOAD_PROGRESSED, (event: any, newProgress: number) => this.setState({progress: newProgress}));
    //     ipcRenderer.on(IPCEnum.DOWNLOAD_FINISHED, () => this.setState({progressText: "Download complete! Installing mod..."}));
    //     ipcRenderer.on(IPCEnum.INSTALLATION_FINISHED, () => {
    //         this.setState({isDownloading: false, buttonDisabled: false});
    //
    //         this.props.setModAsInstalled();
    //     });
    // };

    handleOnClick = () => {
        if (this.props.modIsInstalled) {
            this.props.play();
        } else {
            this.props.install();
        }
    };

    progress = () => {
        if (!this.props.installProgress) return 0;

        return this.props.installProgress.receivedBytes / this.props.installProgress.totalBytes * 100;

    };

    progressBar = () => {
        // If there's no install progress given, do not generate progress bar
        if (!this.props.installProgress) return null;

        let progressText = `${this.progress().toFixed(2)}%
        - ${prettyBytes(this.props.installProgress.receivedBytes)}/${prettyBytes(this.props.installProgress.totalBytes)}
        (Step ${this.props.installProgress.step} of ${this.props.installProgress.outOf})`;

        return (
            <React.Fragment>
                <p>{progressText}</p>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: `${this.progress()}%`}} role="progressbar"> </div>
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <div className="row mt-auto">
                <div className="col-8">
                    {this.progressBar()}
                </div>

                <div className="col-4 text-right">
                    <button className="btn btn-default btn-lg" onClick={this.handleOnClick} disabled={this.props.installProgress !== undefined}>
                        {this.props.modIsInstalled ? 'Play' : 'Install'}
                    </button>
                </div>
            </div>
        );
    }
}