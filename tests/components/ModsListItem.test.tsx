import {shallow, ShallowWrapper} from 'enzyme';
import {ModsListItem, StyledRow} from '../../src/react/components/ModsListItem/ModsListItem';
import {Mod} from '../../src/shared/models/Mod';
import * as React from 'react';
import {resetState, state} from '../../src/react/State';

let mod: Mod;
let item: ShallowWrapper;
describe('ModsListItem', () => {
    beforeEach(() => {
        resetState();
        mod = new Mod('Mod name', '', '');
        item = shallow(<ModsListItem mod={mod}/>);
    });

    it('updates the MenuBarState with a new mod when clicked', () => {
        expect(state.selectedMod).not.toBe(mod);

        item.simulate('click');

        expect(state.selectedMod).toBe(mod);
    });
});