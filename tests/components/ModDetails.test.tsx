import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {Mod} from '../../src/shared/models/Mod';
import {ModDetails} from '../../src/react/components/ModDetails/ModDetails';
import {resetState, state} from '../../src/react/State';

let mod: Mod;
let modDetails: ShallowWrapper;
describe('ModDetails', () => {
    beforeEach(() => {
        mod = new Mod('Name', 'Author', 'Description');
        modDetails = shallow(<ModDetails />);
        resetState();
    });

    it('updates its information when a new mod is selected', () => {
        expect(modDetails.find('h1').text()).not.toBe(mod.name);
        expect(modDetails.find('h2').text()).not.toBe(mod.author);
        expect(modDetails.find('p').text()).not.toBe(mod.description);

        state.selectedMod = mod;
        modDetails.setState({});

        expect(modDetails.find('h1').text()).toBe(mod.name);
        expect(modDetails.find('h2').text()).toBe(mod.author);
        expect(modDetails.find('p').text()).toBe(mod.description);
    });
});