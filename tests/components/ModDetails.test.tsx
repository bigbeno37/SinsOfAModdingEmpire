import * as React from 'react';
import Mod from "../../src/models/Mod";
import SubMod from "../../src/models/SubMod";
import {shallow} from "enzyme";
import ModDetails from "../../src/client/components/ModDetails/ModDetails";

describe('Mod Details', () => {
    it('shows the SubMods component if submods exist', () => {
        let subMod = new SubMod('', '', true);
        let mod = new Mod('', '', '', [], [], true, '', [subMod]);

        const modDetails = shallow(<ModDetails  selectedMod={mod} toggleEnabled={() => {}}/>);

        expect(modDetails.find('SubMods').exists()).toBeTruthy();
    });

    it('doesn\'t show the SubMods component if submods doesn\'t exist', () => {
        let mod = new Mod('', '', '', [], [], true);

        const modDetails = shallow(<ModDetails  selectedMod={mod} toggleEnabled={() => {}}/>);

        expect(modDetails.find('SubMods').exists()).toBeFalsy();
    });
});