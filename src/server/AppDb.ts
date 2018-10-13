import Mod from '../models/Mod';
import axios from "axios";
import ModData from '../interfaces/ModData';
import SubMod from '../models/SubMod';

const store = require('store');

export default class AppDb {
    public static async getAllMods() {

        let sins = new Mod("Sins of a Solar Empire: Rebellion", "Ironclad Studios", "The vanilla experience", [], [], true);

        if (store.get("modsList")) {
            return [sins, ...store.get("modsList")];
        }

        let dataMods = (await axios.get("https://raw.githubusercontent.com/bigbeno37/SinsOfAModdingEmpire/master/data/mods.json")).data as ModData[];

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