import {ipcRenderer} from 'electron';
import Store = require('electron-store');

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

    public static storeGet(key: string) {
        return new Store().get(key);
    }
}