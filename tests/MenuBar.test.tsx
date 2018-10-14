import {shallow} from 'enzyme';
import MenuBar from '../src/client/components/MenuBar/MenuBar';
import * as React from 'react';

describe('Menu Bar', () => {
    it('shows play when modIsInstalled is true', () => {
        const wrapper = shallow(<MenuBar modIsInstalled={true} play={() => {}} install={() => {}}/>);

        
    });
});