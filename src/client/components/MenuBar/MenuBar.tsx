import {Component} from 'react';
import * as React from 'react';
import Mod from '../../../models/Mod';
import EnabledModsBuilder from '../../../models/EnabledModsBuilder';
import {ipcRenderer} from "electron";
import * as prettyBytes from 'pretty-bytes';
import {IPCEnum} from '../../../enums/IPCEnum';

interface props {
    selectedMod: Mod;
    setModAsInstalled: () => void;
}

interface state {
    isDownloading: boolean;
    progress: number;
    fileSize: number;
    buttonText: string;
    buttonDisabled: boolean;
    step: number;
    numSteps: number;
    progressText: string;
}

export default class MenuBar extends Component<props, state> {
    constructor(props: props) {
        super(props);

        this.state = {
            isDownloading: false,
            progress: 0,
            fileSize: 0,
            buttonText: "",
            buttonDisabled: false,
            step: 0,
            numSteps: 0,
            progressText: ""
        }
    }

    componentDidMount() {
        this.setState({buttonText: this.props.selectedMod.isInstalled ? "Play" : "Install"});
    }

    componentDidUpdate(prevProps: props) {
        if (this.props.selectedMod === prevProps.selectedMod) return;

        this.setState({buttonText: this.props.selectedMod.isInstalled ? "Play" : "Install"});
    }

    play() {
        let enabledMods = new EnabledModsBuilder();

        if (this.props.selectedMod.enabledModsName) enabledMods.addMod(this.props.selectedMod.enabledModsName);

        if (this.props.selectedMod.subMods.length > 0) {
            this.props.selectedMod.subMods.forEach(subMod => subMod.isEnabled ? enabledMods.addMod(subMod.enabledModsName) : null);
        }

        ipcRenderer.send(IPCEnum.PLAY, enabledMods.toString());
        ipcRenderer.on(IPCEnum.LAUNCHER_CLOSED, () => console.log("launcher closed!"));
    }

    install = () => {
        this.setState({isDownloading: true, buttonText: "Installing"});
        ipcRenderer.send(IPCEnum.INSTALL, this.props.selectedMod);

        ipcRenderer.on(IPCEnum.NEW_STEP, (event: any, step: number, numSteps: number) => this.setState({step: step, numSteps: numSteps, progressText: "", buttonDisabled: true, progress: 0, fileSize: 0}));
        ipcRenderer.on(IPCEnum.DOWNLOAD_STARTED, (event: any, size: number) => this.setState({isDownloading: true, fileSize: size}));
        ipcRenderer.on(IPCEnum.DOWNLOAD_PROGRESSED, (event: any, newProgress: number) => this.setState({progress: newProgress}));
        ipcRenderer.on(IPCEnum.DOWNLOAD_FINISHED, () => this.setState({progressText: "Download complete! Installing mod..."}));
        ipcRenderer.on(IPCEnum.INSTALLATION_FINISHED, () => {
            this.setState({isDownloading: false, buttonDisabled: false});

            this.props.setModAsInstalled();
        });
    };

    handleOnClick = () => {
        if (this.props.selectedMod.isInstalled) {
            this.play();
        } else {
            this.install();
        }
    };

    render() {
        let progress = null;

        if (this.state.isDownloading) {
            let progressText = `${(this.state.progress*100).toFixed(2)}%
            - ${prettyBytes(this.state.fileSize*this.state.progress)}/${prettyBytes(this.state.fileSize)}
            (Step ${this.state.step} of ${this.state.numSteps})`;

            if (this.state.progressText) progressText = this.state.progressText;

            progress = (
                <React.Fragment>
                    <p>{progressText}</p>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: `${this.state.progress*100}%`}} role="progressbar"> </div>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div className="row mt-auto">
                <div className="col-8">
                    {progress}
                </div>

                <div className="col-4 text-right">
                    <button className="btn btn-default btn-lg" onClick={this.handleOnClick} disabled={this.state.buttonDisabled}>
                        {this.state.buttonText}
                    </button>
                </div>
            </div>
        );
    }
}