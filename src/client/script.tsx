import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App/App';
import {remote} from 'electron';

let render = () => {
    ReactDOM.render(<AppContainer><App mods={remote.getGlobal('mods')}/></AppContainer>, document.getElementById('App'));
};

render();

if ((module as any).hot) { (module as any).hot.accept(render); }