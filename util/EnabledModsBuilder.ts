import * as os from 'os';
import ModItem from '../models/ModItem';
import IMod from '../models/IMod';

/**
 * Returns a string representation of an EnabledMods.txt designed for 'mod'
 * @param mod The mod to create an EnabledMods.txt for
 */
export default function enabledMods(mod: IMod): string {
  const mods: ModItem[] = [];

  if (mod.name !== 'Sins of a Solar Empire: Rebellion') {
    // If the mod isn't a collection, set the only mod to be the one passed in
    if (mod.collection === undefined) {
      mods.push({name: mod.name, enabledModsName: mod.enabledModsName, required: true});

    // The mod is a collection, so import all mod items
    } else {
      mod.collection.forEach(modItem => {
        mods.push(modItem);
      });
    }
  }

  // If vanilla sins is selected, don't load any mods
  if (mods.length <= 0) {
    return `TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 0`;
  } else {

    let enabledModsText = `TXT${os.EOL}Version 0${os.EOL}enabledModNameCount ${mods.length}`;

    mods.forEach(modItem => {
      enabledModsText += `${os.EOL}enabledModName "${modItem.enabledModsName === undefined ? modItem.name : modItem.enabledModsName}"`;
    });

    return enabledModsText;
  }
}
