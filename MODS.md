# Mods
## SoaME Editor
TODO

## Manual entries
Mods are written using JSON in the following configuration:

```javascript
{
    "name": "Mod name",
    "enabledModsName": "Mod-Name-v1",
    "author": "Author",
    "description": "Description",
    "backgroundPictures": [
        "SomePicture.png",
        "OtherPicture.jpg"
    ],
    "installScript": [
        "install script",
        "line 2"
    ]
}
```

Each mod comes with a `name`, `author`, `description`, `backgroundPictures` and an `installScript`. If `enabledModsName` is not specified, the mod added to EnabledMods.txt on play will be the value of `name` e.g. if this mod was enabled, Mod name would be added to EnabledMods.txt whenever this mod was selected. 

`backgroundPictures` are what will show when the user clicks on the mod, and will cycle every ten seconds. The `installScript` will be discussed later on in this document.

For a mod collection (i.e. a mod that has multiple components to it that can be turned off and on), add a `collection` to the configuration, as can be seen below:

```javascript
{
    "name": "Mod name",
    "author": "Author",
    "description": "Description",
    "backgroundPictures": [
        "SomePicture.png",
        "OtherPicture.jpg"
    ],
    "installScript": [
        "install script",
        "line 2"
    ],
    "collection": [
        {
            "name": "AWESOME version",
            "enabledModsName": "Mod-Name-v1-AWESOME",
            "required": true
        },
        {
            "name": "AWESOMER version",
            "enabledModsName": "Mod-Name-v1-AWESOMERRR",
            "required": false
        }
    ]
}
```

Each collection item contains a `name`, a `enabledModsName` (which functions the same as above), and `required` (note that `enabledModsName` must be removed if a mod contains `collection`). If a collection item is required, the user will not be able to disable the specified item, and as such will always be added to the EnabledMods.txt file.

For practical examples on creating manual mod entries, look for mods.json located in the data directory.

## Install Scripts
SoaME comes with an inbuilt scripting language allowing mod authors more power over installation of their mod. Each mod must come with at least some scripting, otherwise SoaME will not be able to determine what to do in order to install the mod.

A basic script looks as follows:
```
require Mod1 from https://...
from Mod1 extract ALL to MODS
```

Now, let"s look at this line by line:
 1. require Mod1 from https://...:
  - Opens a new window informing users they need to download the mod (as a number of mods are hosted on ModDB, SoaME is unable to download mods directly)
 2. from Mod1 extract ALL to MODS
  - From the downloaded archive file, extract everything inside to MODS (except for EnabledMods.txt)
  
Fairly straightforward right? Let"s take a look at a slightly more advanced use case. Just say you have a mod that later receives a patch. This is what a script could look like:
```
require Mod1 from https://...
require Patch from https://...

from Mod1 extract ALL to MODS
from Patch extract ALL to MODS/Mod1
```

Again, let"s go line by line:
 1. require Mod1 from https://...
 2. require Patch from https://...
  - Same thing as before
 3. from Mod1 extract ALL to MODS
 4. from Patch extract ALL to MODS/Mod1
  - Extract everything inside the Patch archive into the mod directory/Mod1
