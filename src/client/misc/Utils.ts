import {ipcRenderer} from 'electron';
import Store = require('electron-store');
import {DB} from '../../shared/enums/DB';

/**
 * Mainly used as a wrapper for not so easily mocked modules
 */
export default class Utils {
    public static ipcRendererOn(channel: string, handler: Function) {
        ipcRenderer.on(channel, handler);
    }

    public static ipcRendererSend(channel: string, value: any) {
        ipcRenderer.send(channel, value);
    }

    public static async ipcRendererSendAsync(channel: string, value: any) {
        ipcRenderer.send(channel, value);

        return new Promise(resolve => {
            ipcRenderer.on(channel, () => resolve());
        });
    }

    public static storeGet(key: string) {
        return new Store().get(key);
    }

    public static addInstalledMod(modName: string) {
        const installedMods: string[] = new Store().get(DB.INSTALLED);

        console.log(`installedMods`);
        console.log(installedMods);

        // If the mod isn't already installed, add it to the installed list
        if (!installedMods.find(mod => mod === modName)) {
            installedMods.push(modName);
        }

        new Store().set(DB.INSTALLED, installedMods);
    }
}