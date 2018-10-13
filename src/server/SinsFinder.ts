import * as fs from "fs";
import {dialog} from "electron";

export default class SinsFinder {
    private static stardockLauncher = 'steamapps/common/Sins of a Solar Empire Rebellion/StardockLauncher.exe';
    private static commonDrive: string[] = ['C:', 'D:', 'E:', 'F:'];

    /**
     * Called by getStardockLauncher, responsible for automatically finding the Stardock Launcher executable
     * @return string|null Location of Stardock Launcher executable
     */
    private static findStardockLauncher(): string | null {
        const commonPath: string[] = [
            `/Program Files (x86)/Steam/${this.stardockLauncher}`,
            `/Program Files/Steam/${this.stardockLauncher}`,
            `/Program Files (x86)/SteamLibrary/${this.stardockLauncher}`,
            `/Program Files/SteamLibrary/${this.stardockLauncher}`,
            `/SteamLibrary/${this.stardockLauncher}`
        ];

        for (const drive of this.commonDrive) {
            for (const pathName of commonPath) {
                const checkPath = `${drive}${pathName}`;

                console.log(`Checking ${drive}${pathName}`);

                if (fs.existsSync(checkPath)) {
                    return checkPath;
                }
            }
        }

        return null;
    }

    /**
     * Called by getModDir, responsible for automatically finding the Sins mod directory
     * @return string|null Location of the Sins mod directory
     */
    private static findModDir(): string | null {
        // Using the user setting to check if the mod folder exists
        const checkMod = '/Documents/My Games/Ironclad Games/Sins of a Solar Empire Rebellion/Mods-Rebellion v1.85/EnabledMods.txt';

        for (const drive of this.commonDrive) {
            const checkPath = `${drive}/Users/${process.env.USERNAME}${checkMod}`;

            if (fs.existsSync(checkPath)) {
                return checkPath.replace('EnabledMods.txt', '');
            }
        }

        return null;
    }

    /**
     * Determines the location of the Stardock Launcher executable. Calls findStardockLauncher, and if it returns null, will prompt
     * the user to manually navigate to it
     * @return string The location of the Stardock Launcher executable
     */
    static getStardockLauncher(): string {
        const foundFile = this.findStardockLauncher();

        // If SoaME is able to automatically find the Sins exe file, don't prompt the user
        if (foundFile) {
            return foundFile;
        }

        // Unable to find Sins exe, so prompt user to select it
        dialog.showMessageBox({
            type: 'error',
            message: 'Unable to automatically find the Stardock Launcher executable! Please select it.'
        });

        const file = dialog.showOpenDialog({
            title: 'Select Sins exe',
            filters: [
                {name: 'exe', extensions: ['exe']}
            ]
        })[0];

        // If the file selected is not the correct Sins exe, ask again
        if (!(file.split('\\').pop() === 'StardockLauncher.exe')) {
            return this.getStardockLauncher();
        }

        // File selected is correct Sins exe, return
        return file;
    }

    /**
     * Determines the location of the Sins mod directory. Calls findModDir, and if it returns null, will prompt
     * the user to manually navigate to it
     * @return string The location of the Sins mod directory
     */
    static getModsDir(): string {
        const foundDir = this.findModDir();

        if (foundDir) {
            return foundDir;
        }

        // Unable to find mods directory, prompt the user to select it
        dialog.showMessageBox({
            type: 'error',
            message: 'Unable to automatically find the Sins of a Solar Empire mods directory! Please select it.'
        });

        const dir = dialog.showOpenDialog({
            title: 'Select Mod Directory',
            properties: [
                'openDirectory'
            ]
        })[0];

        // If the directory selected is not the correct directory, ask again
        if (!(dir.split('\\').pop() === 'Mods-Rebellion v1.85')) {
            console.log(dir);

            return this.getModsDir();
        }

        // File selected is correct Sins exe, return
        return dir;
    }
}