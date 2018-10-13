import Mod from '../models/Mod';
import {download} from 'electron-dl';
import {BrowserWindow, DownloadItem} from "electron";
import * as extract from 'extract-zip';
import {Parser} from 'htmlparser2';
import axios from 'axios';
import {IPCEnum} from '../enums/IPCEnum';
import AppDb from './AppDb';

export default class ModInstaller {
    async installMod(mod: Mod, window: BrowserWindow, modsDir: string) {

        for (let [index, step] of mod.installSteps.entries()) {
            console.log(`Installing step ${index}`);
            console.log(`Mod link is ${await this.getDownloadLink(step.download)}`);
            window.webContents.send(IPCEnum.NEW_STEP, index+1, mod.installSteps.length);

            let downloadItem = await download(window, await this.getDownloadLink(step.download), {
                onStarted: (item: DownloadItem) => {
                    window.webContents.send(IPCEnum.DOWNLOAD_STARTED, item.getTotalBytes());
                    console.log("Download started!");
                },
                onProgress: (progress: number) => {
                    window.webContents.send(IPCEnum.DOWNLOAD_PROGRESSED, progress);
                    console.log(`${progress*100}% complete!`);
                }
            });

            window.webContents.send(IPCEnum.DOWNLOAD_FINISHED);

            console.log(downloadItem.getSavePath());

            // Await the extraction
            await new Promise((resolve) => {
                // TODO: Only extract directories and files as specified
                extract(downloadItem.getSavePath(), {dir: `${modsDir}../TEST/${step.to ? step.to : ""}`, onEntry: ((entry, zipfile) => {})}, () => {
                    resolve();
                });
            });
        }

        window.webContents.send(IPCEnum.INSTALLATION_FINISHED);
        AppDb.setModAsInstalled(mod);
    }

    private async getDownloadLink(modDbUrl: string): Promise<string> {
        return await this.downloadLinkFromModDbId(await this.getModDbIdFromLink(modDbUrl));
    }

    private async getModDbIdFromLink(downloadPageUrl: string) {
        let id = "";

        let parser = new Parser({onopentag: (name, attribs) => {
                if (attribs.property === "og:image") {
                    id = attribs.content.split("/")[7];
                }
            }});

        parser.write((await axios.get(downloadPageUrl)).data);
        parser.end();

        return id;
    }

    private async downloadLinkFromModDbId(id: string) {
        let downloadPage: string = (await axios.get(`https://www.moddb.com/downloads/start/${id}`)).data;
        let downloadLink = downloadPage.split(" ").filter(element => element.includes("href="))[1];

        return `https://moddb.com${downloadLink.split("\"")[1]}`;
    }
}