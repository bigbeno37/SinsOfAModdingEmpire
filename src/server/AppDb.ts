import Mod from '../models/Mod';
import ModData from '../interfaces/ModData';
import SubMod from '../models/SubMod';
import * as got from 'got';
import * as fs from 'fs';

export default class AppDb {
    public static async getAllMods() {
        let sins = new Mod("Sins of a Solar Empire: Rebellion", "Ironclad Studios", "The vanilla experience", [], [], true);

        let dataMods: ModData[] = [];

        if (process.env.DEV_MODE) {
            dataMods = JSON.parse(fs.readFileSync('data/mods.json', 'utf8'));
        } else {
            dataMods = (await got("https://raw.githubusercontent.com/bigbeno37/SinsOfAModdingEmpire/master/data/mods.json", {json: true})).body as ModData[];
        }

        let mods: Mod[] = [];

        dataMods.forEach(mod => {
            let subMods: SubMod[] = [];

            if (mod.subMods) mod.subMods.forEach(subMod => {
                subMods.push(new SubMod(subMod.name, subMod.enabledModsName, subMod.required))
            });

            mods.push(new Mod(mod.name, mod.author, mod.description, mod.backgroundPictures, mod.installSteps, false, mod.enabledModsName, subMods));
        });

        return [sins, ...mods];
    }

    // TODO: Make functional
    public static isInstalled(mod: string) {
        return true;
    }

    // TODO: Store mod as installed
    public static setModAsInstalled(mod: Mod) {

    }
}