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

        this.sendToChannel(IPCEnum.PLAY, enabledMods.toString());

        await this.channelResponse(IPCEnum.LAUNCHER_CLOSED);
    }

    public async installMod(mod: Mod, update: (progress: InstallationProgress) => void) {
        this.sendToChannel(IPCEnum.INSTALL, mod);

        this.subscribeToChannel(IPCEnum.NEW_STEP, (event, step) => {
            update({type: IPCEnum.NEW_STEP, step: step});
        });

        this.subscribeToChannel(IPCEnum.DOWNLOAD_STARTED, (event, size) => {
            update({type: IPCEnum.DOWNLOAD_STARTED, receivedBytes: 0, totalBytes: size});
        });

        this.subscribeToChannel(IPCEnum.DOWNLOAD_PROGRESSED, (event, newProgress) => {
            update({type: IPCEnum.DOWNLOAD_PROGRESSED, receivedBytes: newProgress});
        });

        return new Promise(resolve => {
            this.subscribeToChannel(IPCEnum.DOWNLOAD_FINISHED, () => {
                update({type: IPCEnum.DOWNLOAD_FINISHED});
                resolve();
            });
        });
    }

    public sendToChannel(channel: string, ...data: any) {
        ipcRenderer.send(channel, ...data);
    }

    public async channelResponse(channel: string) {
        return new Promise(resolve => {
            ipcRenderer.on(channel, (event: any, ...args: any[]) => {
                resolve([event, ...args]);
            });
        });
    }

    public subscribeToChannel(channel: string, callback: (event: any, ...args: any[]) => void) {
        ipcRenderer.on(channel, (event: any, ...args: any[]) => callback(event, ...args));
    }
}