import Mod from '../shared/models/Mod';
import {ipcMain, BrowserWindow} from 'electron';
import {IPC} from '../shared/enums/IPC';
import * as fs from 'fs';
import EnabledModsBuilder from './EnabledModsBuilder';
import {execFile} from 'child_process';
import Store = require('electron-store');
import {DB} from '../shared/enums/DB';
import InstallStep from '../shared/models/InstallStep';
import got = require('got');
import {Parser} from 'htmlparser2';
import {download} from 'electron-dl';

const store = new Store();

export class IPCHandler {
    static window: BrowserWindow;

    constructor(window: BrowserWindow) {
        ipcMain.on(IPC.PLAY, async (event: any, mod: Mod) => await this.handlePlay(event, mod));
        ipcMain.on(IPC.INSTALL, async (event: any, step: InstallStep) => await this.handleInstall(event, step));

        IPCHandler.window = window;
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

    async handleInstall(event: any, step: InstallStep) {
        // TODO: Handle HTTP errors

        // Download from step URL
        // Convert ModDB item download page into an ID
        let page = await got(step.download);

        let id = '';

        let parser = new Parser({
            onopentag: (name, attribs) => {
                if (name === 'meta' && attribs.property === 'og:image') {
                    id = attribs.content.split('/')[7];
                }
            }
        }, {decodeEntities: true});

        parser.write(page.body);
        parser.end();

        // Get download link
        let downloadPage = await got(`https://www.moddb.com/downloads/start/${id}`);

        let downloadLink = '';

        parser = new Parser({
            onopentag: (name, attribs) => {
                // If this is a link and downloadLink doesn't have any content, this
                // must be the first link
                if (name === 'a' && !downloadLink) {
                    downloadLink = `https://www.moddb.com${attribs.href}`;
                }
            }
        }, {decodeEntities: true});

        parser.write(downloadPage.body);
        parser.end();

        // Download URL has been constructed, begin downloading
        let downloadedMod = await download(IPCHandler.window, downloadLink, {
            onStarted: item => console.log(`Download started! Item size ${item.getTotalBytes()}`),

            onProgress: progress => console.log(`Current progress: %${progress * 100}`)
        });

        console.log(downloadedMod);

        event.sender.send(IPC.INSTALL);
    }
}