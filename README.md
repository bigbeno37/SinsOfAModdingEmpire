# SinsOfAModdingEmpire
Sins of a Solar Empire mod installation tool, utilising Electron and Angular!

## TODO: How to use

## Contributing
Getting started with SoaME is fairly straightforward; making sure you have NodeJS installed, fork this repository, clone your fork, open a terminal at the location you cloned to, and run `npm install`. Afterwards, run `npm start`. In a few moments you should have your own version of SoaME up and running! To build a distributable file, run `npm electron:windows`.

### How it works
SoaME utilises two main NodeJS packages; Electron, and Angular. Electron is what powers the GUI (and is in fact just a stripped down version of Chrome), while Angular is a front end framework designed to make designing applications simpler.

In terms of the lifecycle of the application, everything begins at main.ts, located at the root directory. This is what calls electron, and points it to src/index.html. Anything that requires initialisation before angular loads (such as the status of mods, sins exe file, sins mod folder, etc.) should be handled before `win = new BrowserWindow(...)` is called.

Angular comprises of many components, where each component can exist on its own, or in or part of another component. In SoaME, HomeComponent (as part of `HomeComponent.ts` found in src/app/components) is the main component, and loads in three other components; ModComponent (the div that can be clicked to select the current mod), MenuComponent (the menu containing the Play / Install button at the bottom), and ModDetailComponent (the text to the right containing information such as author and description about the mod). Every component has its own directory located under src/app/components, containing its css, html, ts file and testing file. Make sure to note that the css file of an Angular component only styles elements inside itself i.e. a parent css file will not style a child component.

### What should I contribute?
While we always appreciate contributions in the form of added documentation and bug fixes, feel free to check out our projects board and see if a desired feature has yet to be implemented.
