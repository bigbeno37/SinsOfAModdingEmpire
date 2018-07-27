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
  - Uses the included EnabledMods.txt from Mod1
  - If there is only one require SoaME is smart enough to determine that DEFAULT is coming from Mod1
  
Fairly straightforward right? Let's take a look at a slightly more advanced use case. Just say you have a mod that later receives a patch. This is what a script could look like:
```
require Mod1 from https://...
require Patch from https://...

from Mod1 extract ALL to MODS
from Patch extract ALL to MODS/Mod1

enable DEFAULT from Mod1
```

Again, let's go line by line:
 1. require Mod1 from https://...
 2. require Patch from https://...
  - Same thing as before
 3. from Mod1 extract ALL to MODS
 4. from Patch extract ALL to MODS/Mod1
  - Extract everything inside the Patch archive into the mod directory/Mod1
 5. enable DEFAULT from Mod1
  - There are multiple required archives, so use the EnabledMods.txt from Mod1

Not too bad. Let's analyse a more complicated example. Imagine that you have a collection of mods that you'd like users to be able to turn off and on at will. Here's an example:
```
set this mod as a collection
require ModCollection from https://...

set Mod1 as a mod
set Mod2 as a mod called "The AWESOMER version"

from ModCollection extract ALL to MODS

enable DEFAULT
```

Line by line:
 1. set this mod as a collection
  - Defines the current mod as a collection of mods
 2. require ModCollection from https://... as a collection
  - Same as usual except this mod will be shown as a collection in SoaME
 3. set Mod1 as a mod
  - Adds the Mod1 directory to be added in the EnabledMods.txt file when enabled
  - By default, the shown name in SoaME will be its Directory name i.e. Mod1
 4. set Mod2 as a mod called "The AWESOMER version"
  - Same as before, except the display name will be "The AWESOMER version"
 5. from ModCollection extract ALL to MODS
 6. enable DEFAULT
 
Now, what happens if we want a collection of mods, but they are spread out across multiple downloads? To add onto this, what if a specific mod is required (i.e. always enabled, such as a dependency like E4X)? This is easy with SoaME:
```
set this mod as a collection
require Mod1 from https://...
require Mod2 from https://...
require Mod3 from https://... 

require Mod1 as a mod
set Mod2 as a mod
set Mod3 as a mod called "Even better!"

from Mod1 extract ALL to MODS
from Mod2 extract ALL to MODS
from Mod3 extract ALL to MODS

enable ALL
```

Line by line:
 1. set this mod as a collection
 2. require Mod1 from https://...
 3. require Mod2 from https://...
 4. require Mod1 from https://...
 5. require Mod1 as a mod
  - This will always be enabled
 6. set Mod2 as a mod
 7. set Mod3 as a mod called "Even better!"
 8. from Mod1 extract ALL to MODS
 9. from Mod2 extract ALL to MODS
 10. from Mod3 extract ALL to MODS
 11. enable ALL
  - Enables all mods in this collection by default
