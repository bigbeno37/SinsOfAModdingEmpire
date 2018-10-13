import SubMod from './SubMod';
import ModData from '../interfaces/ModData';
import InstallStep from '../interfaces/InstallStep';

export default class Mod implements ModData {
    name: string;
    author: string;
    description: string;
    backgroundPictures: string[];
    installSteps: InstallStep[];
    subMods: SubMod[];
    enabledModsName: string;

    isInstalled: boolean;


    constructor(name: string, author: string, description: string, backgroundPictures: string[], installSteps: InstallStep[],
                isInstalled: boolean, enabledModsName: string = "", subMods: SubMod[] = []) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.backgroundPictures = backgroundPictures;
        this.installSteps = installSteps;
        this.isInstalled = isInstalled;
        this.enabledModsName = enabledModsName;
        this.subMods = subMods;
    }
}