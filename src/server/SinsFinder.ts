import {dialog} from 'electron';
import * as fs from 'fs';

export default class SinsFinder {
    private static stardockLauncher = 'steamapps/common/Sins of a Solar Empire Rebellion/StardockLauncher.exe';
    private static commonDrive: string[] = ['C:', 'D:', 'E:', 'F:'];

    /**
     * Prompts the user to select the Stardock Launcher executable
     */
    private static promptUserForStardockLauncher(): string {
        dialog.showMessageBox({
            message: 'Unable to automatically find the Stardock Launcher! Please select the Stardock Launcher',
            title: 'Select the Stardock Launcher',
            type: 'error'
        });
        let path = dialog.showOpenDialog({
            title: 'Select the Stardock Launcher',
            filters: [{name: 'exe', extensions: ['exe']}]
        })[0];

        while (path.split('\\').pop() !== 'StardockLauncher.exe') {
            dialog.showMessageBox({
                title: 'Select the Stardock Launcher',
                message: 'Incorrect exe selected, select the Stardock Launcher',
                type: 'error'
            });

            path = dialog.showOpenDialog({
                title: 'Select the Stardock Launcher',
                filters: [{name: 'exe', extensions: ['exe']}]
            })[0];
        }

        return path;
    }

    /**
     * Attempts to automatically find the Stardock Launcher. If unsuccessful,
     * will prompt the user to navigate to it
     */
    public static async findStardockLauncher() {
        console.log('Looking for Stardock Launcher...');

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

                if (await this.pathExists(checkPath)) {
                    return checkPath;
                }
            }
        }

        // Unable to locate Stardock Launcher, prompt user
        return this.promptUserForStardockLauncher();
    }

    /**
     * Prompts the user to select the mods directory
     */
    private static promptUserForModsDir() {
        dialog.showMessageBox({
            message: 'Unable to automatically find the mods directory! Please select the mods directory',
            title: 'Select the mods directory',
            type: 'error'
        });

        let path = dialog.showOpenDialog({
            title: 'Select the mods directory',
            properties: ['openDirectory']
        })[0];

        while (path.split('\\').pop() !== 'Mods-Rebellion v1.85') {
            dialog.showMessageBox({
                title: 'Select the mods directory',
                message: 'Incorrect folder selected, select the mods directory!',
                type: 'error'
            });

            path = dialog.showOpenDialog({
                title: 'Select the mods directory',
                properties: ['openDirectory']
            })[0];
        }

        return path;
    }

    public static async findModsDir() {
        console.log('Looking for the mods directory...');

        // Using the user setting to check if the mod folder exists
        const checkMod = '/Documents/My Games/Ironclad Games/Sins of a Solar Empire Rebellion/Mods-Rebellion v1.85/enabledMods.txt';

        for (const drive of this.commonDrive) {
            const checkPath = `${drive}/Users/${process.env.USERNAME}${checkMod}`;

            if (await this.pathExists(checkPath)) {
                return checkPath.replace('enabledMods.txt', '');
            }
        }

        // Unable to find mods dir, prompt user
        return this.promptUserForModsDir();
    }

    /**
     * Checks if the given path is valid
     * @param path True if the path exists, false otherwise
     */
    public static async pathExists(path: string) {
        return await new Promise(resolve => {
            fs.access(path, fs.constants.F_OK, err => resolve(!err));
        });
    }
}