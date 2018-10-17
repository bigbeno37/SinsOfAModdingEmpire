import Mod from "../models/Mod";
import EnabledModsBuilder from "../models/EnabledModsBuilder";
import {IPCEnum} from "../enums/IPCEnum";
import {ipcRenderer} from 'electron';
import InstallationProgress from "../interfaces/InstallationProgress";

export default class Logic {
    private static _instance: Logic;

    public static get instance() {
        if (!this._instance) {
            this._instance = new Logic();
        }

        return this._instance;
    }

    public async launchStardock(mod: Mod) {
        let enabledMods = new EnabledModsBuilder();

        if (mod.enabledModsName) enabledMods.addMod(mod.enabledModsName);

        if (mod.subMods.length > 0) {
            mod.subMods.forEach(subMod => subMod.isEnabled ? enabledMods.addMod(subMod.enabledModsName) : null);
        }

        this.ipcSendTo(IPCEnum.PLAY, enabledMods.toString());

        await this.listenToChannel(IPCEnum.LAUNCHER_CLOSED);
    }

    public async installMod(mod: Mod, update: (progress: InstallationProgress) => void) {
        // this.setState({isDownloading: true, buttonText: "Installing"});
        // ipcRenderer.send(IPCEnum.INSTALL, this.props.selectedMod);
        //
        // ipcRenderer.on(IPCEnum.NEW_STEP, (event: any, step: number, numSteps: number) => this.setState({step: step, numSteps: numSteps, progressText: "", buttonDisabled: true, progress: 0, fileSize: 0}));
        // ipcRenderer.on(IPCEnum.DOWNLOAD_STARTED, (event: any, size: number) => this.setState({isDownloading: true, fileSize: size}));
        // ipcRenderer.on(IPCEnum.DOWNLOAD_PROGRESSED, (event: any, newProgress: number) => this.setState({progress: newProgress}));
        // ipcRenderer.on(IPCEnum.DOWNLOAD_FINISHED, () => this.setState({progressText: "Download complete! Installing mod..."}));
        //
        // return new Promise(resolve => {
        //     ipcRenderer.on(IPCEnum.INSTALLATION_FINISHED, () => {
        //         resolve();
        //     });
        // });
    }

    public ipcSendTo(channel: string, ...data: any) {
        ipcRenderer.send(channel, ...data);
    }

    public async listenToChannel(channel: string) {
        return new Promise(resolve => {
            ipcRenderer.on(channel, (event: any, ...args: any) => {
                resolve([event, ...args]);
            });
        });
    }
}