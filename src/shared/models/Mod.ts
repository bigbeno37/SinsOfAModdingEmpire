import InstallStep from './InstallStep';

/**
 * Represents a mod to be displayed in SoaME
 */
export default class Mod {
    public readonly name: string;
    public readonly author: string;
    public readonly description: string;
    public readonly steps: InstallStep[];

    /**
     * The name of the mod that will be placed into enabledMods.txt
     */
    public readonly enabledModsName: string;

    constructor(name: string, author: string, description: string, enabledModsName: string, steps: InstallStep[]) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.enabledModsName = enabledModsName;
        this.steps = steps;
    }
}