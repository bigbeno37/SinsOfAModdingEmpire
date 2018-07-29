import ModItem from './ModItem';
import IMod from './IMod';

export default class Mod implements IMod {
  name: string;
  enabledModsName: string;
  author: string;
  description: string;
  backgroundPictures: string[];
  installScript: string[];
  collection: ModItem[];
  private _enabledMods: ModItem[];

  constructor(name: string, author: string, description: string,
              backgroundPictures: string[], installScript: string[], enabledModsName?: string, collection?: ModItem[]) {
    this.name = name;
    this.enabledModsName = enabledModsName === undefined ? name : enabledModsName;

    this.author = author;
    this.description = description;
    this.backgroundPictures = backgroundPictures;
    this.installScript = installScript;
    this.collection = collection;
    this._enabledMods = collection;
  }

  toJSON(): IMod {
    return {
      name: this.name,
      enabledModsName: this.enabledModsName,
      author: this.author,
      description: this.description,
      backgroundPictures: this.backgroundPictures,
      installScript: this.installScript,
      collection: this.collection
    };
  }
}
