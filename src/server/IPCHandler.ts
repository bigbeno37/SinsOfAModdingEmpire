import {ipcMain, BrowserWindow} from "electron";
import * as fs from 'fs';
import {execFile} from 'child_process';
import Mod from '../models/Mod';
import ModInstaller from './ModInstaller';
import {IPCEnum} from '../enums/IPCEnum';

export default class IPCHandler {
    public registerHandlers(modsDir: string, stardockLauncher: string, window: BrowserWindow) {
        ipcMain.on(IPCEnum.PLAY, (event: any, enabledMods: string) => {
            fs.writeFile(`${modsDir}enabledMods.txt`, enabledMods);

            execFile(stardockLauncher, () => {
                event.sender.send(IPCEnum.LAUNCHER_CLOSED);
            });
        });

        ipcMain.on(IPCEnum.INSTALL, async (event: any, mod: Mod) => {
            new ModInstaller().installMod(mod, window, modsDir);
        });
    }
}