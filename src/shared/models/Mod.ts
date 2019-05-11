export class Mod {
    public name: string;
    public author: string;
    public description: string;
    public enabledMods: string;

    constructor(name: string, author: string, description: string, enabledMods: string) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.enabledMods = enabledMods;
    }
}