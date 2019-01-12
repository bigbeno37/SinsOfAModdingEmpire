import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {App} from './components/App/App';
import Mod from '../shared/models/Mod';

let mods = [
    new Mod('Sins of a Solar Empire: Rebellion', 'Ironclad Studios', 'The vanilla experience', '', []),
    new Mod('Star Trek: Armada III', 'Some dudes', 'A total conversion mod in the theme of Star Trek!', 'SGI-master', [
        {download: 'https://www.moddb.com/mods/stars/downloads/stars-3', extract: []}
    ])
];

let render = () => {
    ReactDOM.render(<AppContainer><App mods={mods}/></AppContainer>, document.getElementById('App'));
};

render();
if ((module as any).hot) { (module as any).hot.accept(render); }