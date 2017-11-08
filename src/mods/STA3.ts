import {Mod} from "../models/Mod";

let STA3: Mod = new Mod(
  // Name
  "Star Trek: Armada III",
  // Author
  "Somebody",
  // Description
  "A star trek mod!",
  // Background images
  ["ArmadaIII.jpg"],
  // Install script
  [
    "require STA3-full-mod.zip as sta3, patch11.zip as patch",
    "from sta3 extract folder STA3 to MODS",
    "from sta3 extract folder GalaxyForge to MODS and do not add to EnabledMods",
    "from patch extract files in ROOT to MODS/STA3 and overwrite and do not add to EnabledMods"
  ]
);

export default STA3;
