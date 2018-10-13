import InstallStep from './InstallStep';
import SubMod from '../models/SubMod';

/**
 * Representation of a mod loaded in from a remote source i.e. from data/mods.json
 */
export default interface ModData {
    name: string;
    author: string;
    description: string;

    /**
     * Location of background pictures to show on displaying this mod
     */
    backgroundPictures: string[];

    /**
     * Steps to take when the user clicks the Install button
     */
    installSteps: InstallStep[];

    /**
     * When playing this mod, this will be loaded into enabledMods.txt UNLESS [[ModData.subMods]] is present,
     * in which case those will be loaded instead
     */
    enabledModsName?: string;

    /**
     * If this mod has optional mods that can be enabled / disabled, they will be specified here. If no subMods
     * are provided, [[ModData.enabledModsName]] must be provided
     */
    subMods?: SubMod[];
}