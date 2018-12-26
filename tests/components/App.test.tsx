import {shallow, ShallowWrapper} from 'enzyme';
import {App} from '../../src/client/components/App/App';
import Mod from '../../src/shared/models/Mod';
import * as React from 'react';

const mod1 = new Mod('name', 'author', 'description', 'name');
const mod2 = new Mod('name2', 'author2', 'description2', 'name2');

let app: ShallowWrapper;

describe('App', () => {
    beforeEach(() => {
        app = shallow(<App mods={[mod1, mod2]}/>);
    });

    /**
     * ModsListItem specific tests
     */
    it('updates the state correctly after onModItemClicked is called', () => {
        // Make sure the first mod is currently displaying
        expect(app.state('selectedMod')).toBe(mod1);

        // 'Click' the second mod
        (app.instance() as App).onModItemClicked(mod2);

        // The second mod should now be set as the selected mod
        expect(app.state('selectedMod')).toBe(mod2);

        // 'Click' the first mod
        (app.instance() as App).onModItemClicked(mod1);

        // The first mod should now be set as the selected mod
        expect(app.state('selectedMod')).toBe(mod1);
    });
});