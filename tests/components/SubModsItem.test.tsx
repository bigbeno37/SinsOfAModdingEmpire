import * as React from 'React';
import SubMod from "../../src/models/SubMod";
import {shallow} from "enzyme";
import SubModsItem from "../../src/client/components/SubModsItem/SubModsItem";

describe('Sub Mods Item', () => {
    it('adds enabled class if the sub mod is enabled', () => {
        let subMod = new SubMod('', '', false);

        const subModsItem = shallow(<SubModsItem subMod={subMod} toggleEnabled={() => {}}/>);

        expect(subModsItem.find('.enabled').exists()).toBeTruthy();
    });

    it('doesn\'t add enabled class if the sub mod isn\'t enabled', () => {
        let subMod = new SubMod('', '', false, false);

        const subModsItem = shallow(<SubModsItem subMod={subMod} toggleEnabled={() => {}}/>);

        expect(subModsItem.find('.enabled').exists()).toBeFalsy();
    });

    it('adds required class if the sub mod is required', () => {
        let subMod = new SubMod('', '', true, true);

        const subModsItem = shallow(<SubModsItem subMod={subMod} toggleEnabled={() => {}}/>);

        expect(subModsItem.find('.required').exists()).toBeTruthy();
    });

    it('doesn\' add required class if the sub mod isn\'t required', () => {
        let subMod = new SubMod('', '', true);

        const subModsItem = shallow(<SubModsItem subMod={subMod} toggleEnabled={() => {}}/>);

        expect(subModsItem.find('.required').exists()).toBeFalsy();
    });
});