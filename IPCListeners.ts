import {ipcMain} from 'electron';
import {execFile} from 'child_process';
import * as fs from 'fs';
import * as util from 'util';
import IMod from './models/IMod';
import enabledMods from './util/EnabledModsBuilder';

export default async function useListeners() {
  const writeFileAsync = util.promisify(fs.writeFile);

  ipcMain.on('launchGameWithMod', async (event, mod: IMod) => {
    // TODO: Change EnabledMods.txt
    await writeFileAsync(global['modDir'] + '/EnabledMods.txt', enabledMods(mod));

    // Execute the stardock launcher, and once it closes inform the renderer
    execFile(global['sinsExe'], error => {
      event.sender.send('launcherClosed', '');
    });
  });
}
