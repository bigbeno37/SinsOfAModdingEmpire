import {ipcMain} from 'electron';
import {Channel} from '../shared/Channel';
import {Mod} from '../shared/models/Mod';

import {promisify} from 'util';
import {writeFile} from 'fs';
import {execFile} from 'child_process';
import {DB} from './DB';

const writeFilePromise = promisify(writeFile);
const execFilePromise = promisify(execFile);

export const setupIpcHandlers = () => {
    ipcMain.on(Channel.PLAY, async (event: any, mod: Mod) => {
        let db = new DB();
        await writeFilePromise(db.modsDir + '/enabledMods.txt', mod.enabledMods);
        await execFilePromise(db.stardockLauncher);
        event.sender.send(Channel.PLAY);
    });
};