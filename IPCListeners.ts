import {ipcMain} from 'electron';
import Mod from './models/Mod';
import {execFile, execFileSync} from 'child_process';

export default function useListeners() {
  ipcMain.on('launchGameWithMod', (event, mod: Mod) => {
    // TODO: Change EnabledMods.txt

    // Execute the stardock launcher, and once it closes inform the renderer
    execFile(global['sinsExe'], error => {
      event.sender.send('launcherClosed', '');
    });
  });
}
