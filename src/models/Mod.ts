export class Mod {
  name: string;
  author: string;
  description: string;
  backgroundPictures: string[];
  installScript: string[] = [];

  constructor(name: string, author: string, description: string, backgroundPictures: string[], installScript: string[]) {
    this.name = name;
    this.author = author;
    this.description = description;
    this.backgroundPictures = backgroundPictures;
    this.installScript = installScript;
  }

  private getRequiredMods(script: string[]): string[] {
    let requiredMods: string[] = [];

    for (let line of script) {
      // If the current line contains an extraction call AND is to be added to EnabledMods...
      if (line.indexOf("from") !== -1 && line.indexOf("do not add to EnabledMods") === -1) {
        let splitLine = line.split(" ");

        // Go through each word in the line
        for (let word in splitLine) {

          // If the current word is folder...
          if (splitLine[word].localeCompare("folder") === 0) {
            // Add the next word to the RequiredMods array
            requiredMods.push(splitLine[word+1]);
            break;
          // Otherwise if the current word is files...
          } else if (splitLine[word].localeCompare("files") === 0) {
            // Add two words over to the RequiredMods array
            requiredMods.push(splitLine[word+2]);
            break;
          }
        }
      }
    }

    return requiredMods;
  }

  getEnabledMods(): string {
    let requiredMods = this.getRequiredMods(this.installScript);
    let enabledMods = "TXT\nVersion 0\nenabledModNameCount " + requiredMods.length + "\n";

    for (let mod of requiredMods) {
      enabledMods += 'enabledModName "' + mod + '"\n';
    }

    return enabledMods;
  }
}

/*

INSTALLATION SCRIPT
require STA3-full-mod.zip as sta3, patch11.zip as patch

from sta3 extract folder STA3 to MODS
from sta3 extract folder GalaxyForge to MODS and do not add to EnabledMods
from patch extract files in ROOT to MODS/STA3 and overwrite and do not add to EnabledMods

 */
