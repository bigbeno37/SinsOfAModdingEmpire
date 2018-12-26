import Mod from '../shared/models/Mod';
import {ipcMain} from 'electron';
import {IPC} from '../shared/enums/IPC';
import * as fs from 'fs';
import EnabledModsBuilder from './EnabledModsBuilder';
import {execFile} from 'child_process';
import Store = require('electron-store');
import {DB} from '../shared/enums/DB';

const store = new Store();

export class IPCHandler {
    constructor() {
        ipcMain.on(IPC.PLAY, async (event: any, mod: Mod) => await this.handlePlay(event, mod));
    }

    async handlePlay(event: any, mod: Mod) {
        // Write to enabledMods.txt
        await new Promise((resolve, reject) => {
            fs.writeFile(
                `${global[DB.MODS_DIR]}\\enabledMods.txt`,
                new EnabledModsBuilder().addMod(mod.enabledModsName).toString(),
                err => {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                }
            );
        });

        // Everything went fine, save this as the currently selected mod for future loads
        store.set(DB.SELECTED_MOD, mod.name);

        // Launch StardockLauncher.exe
        await new Promise((resolve, reject) => {
            execFile(global[DB.STARDOCK_LAUNCHER], error => {
                if (error) {
                    reject(error);
                }

                resolve();
            });
        });

        // Once the stardock launcher has been closed, inform the client
        event.sender.send(IPC.PLAY);
    }
}