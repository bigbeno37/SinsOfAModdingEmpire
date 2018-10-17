import Logic from "../src/client/Logic";
import Mod from "../src/models/Mod";
import {IPCEnum} from "../src/enums/IPCEnum";
import * as os from "os";

let logic: Logic;

describe('Logic', () => {
    beforeEach(() => {
        logic = new Logic();
        logic.ipcSendTo = jest.fn();
        logic.listenToChannel = jest.fn(() => new Promise(resolve => resolve()));
    });

    it('launchStardock calls ipcRenderer with correct parameters', () => {
        const mod = new Mod('', '', '', [], [], true);

        logic.launchStardock(mod).then(() => {});

        expect(logic.ipcSendTo).toHaveBeenCalledWith(IPCEnum.PLAY, `TXT${os.EOL}Version 0${os.EOL}enabledModNameCount 0${os.EOL}`);
    });
});