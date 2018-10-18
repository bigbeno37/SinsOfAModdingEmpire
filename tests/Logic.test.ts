import Logic from "../src/client/Logic";
import Mod from "../src/models/Mod";
import {IPCEnum} from "../src/enums/IPCEnum";
import * as os from "os";

let logic: Logic;

describe('Logic', () => {
    beforeEach(() => {
        logic = new Logic();
        logic.sendToChannel = jest.fn();
        logic.channelResponse = jest.fn(() => new Promise(resolve => resolve()));
        logic.subscribeToChannel = jest.fn();
    });

    it('calls ipcRenderer with correct parameters in launchStardock', () => {
        logic.launchStardock(new Mod('', '', '', [], [], true))
            .then();

        expect(logic.sendToChannel).toHaveBeenCalledWith(IPCEnum.PLAY, `TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 0${os.EOL}`);
    });

    it('calls ipcRenderer immediately with correct parameters in installMod', () => {
        const mod = new Mod('', '', '', [], [], false);

        logic.installMod(mod, () => {}).then();

        expect(logic.sendToChannel).toHaveBeenCalledWith(IPCEnum.INSTALL, mod);
    });
});