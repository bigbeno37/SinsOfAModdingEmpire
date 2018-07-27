# Scripting
SoaME comes with an inbuilt scripting language allowing mod authors more power over installation of their mod. Each mod must come with at least some scripting, otherwise SoaME will not be able to determine what to do in order to install the mod.

A basic script looks as follows:
```
require Mod1 from https://...
from Mod1 extract ALL to MODS
enable DEFAULT
```

Now, let's look at this line by line:
 1. require Mod1 from https://...:
  - Opens a new window informing users they need to download the mod (as a number of mods are hosted on ModDB, SoaME is unable to download mods directly)
 2. from Mod1 extract ALL to MODS
  - From the downloaded archive file, extract everything inside to MODS (except for EnabledMods.txt)
 3. enable DEFAULT
  - Uses the included EnabledMods.txt 
  
Fairly straightforward right? Let's take a look at a slightly more advanced use case. Just say you have a mod that later receives a patch. This is what a script could look like:
```
require Mod1 from https://...
require Patch from https://...

from Mod1 extract ALL to MODS
from Patch extract ALL to MODS/Mod1

enable DEFAULT

```

Again, let's go line by line:
 1. require Mod1 from https://...
 2. require Patch from https://...
  - Same thing as before
 3. from Mod1 extract ALL to MODS
 4. from Patch extract ALL to MODS/Mod1
  - Extract everything inside the Patch archive into the mod directory/Mod1
 5. enable DEFAULT

Not too bad. Let's analyse a more complicated example. Imagine that you have a collection of mods that you'd like users to be able to turn off and on at will. Here's an example:
```
require ModCollection from https://... as a collection

add Mod1 to ModCollection
add Mod2 to ModCollection as "The AWESOMER version"

from ModCollection extract ALL to MODS

enable DEFAULT
```

Line by line:
 1. require ModCollection from https://... as a collection
  - Same as usual except this mod will be shown as a collection in SoaME
 2. add Mod1 to ModCollection
  - Adds the Mod1 directory to be added in the EnabledMods.txt file when enabled
  - By default, the shown name in SoaME will be its Directory name i.e. Mod1
 3. add Mod2 to ModCollection as "The AWESOMER version"
  - Same as before, except the display name will be "The AWESOMER version"
 4. from ModCollection extract ALL to MODS
 5. enable DEFAULT
