import ModItem from './ModItem';

export default interface IMod {
  name: string;
  enabledModsName?: string;
  author: string;
  description: string;
  backgroundPictures: string[];
  installScript: string[];
  collection?: ModItem[];
}
