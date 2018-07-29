import {Component, Input, OnInit} from '@angular/core';
import { ipcRenderer } from 'electron';
import Mod from '../../../../models/Mod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() currentMod: Mod;

  onPlayClicked() {
    document.getElementById('play-button').innerHTML = 'Launching';
    document.getElementById('play-button').setAttribute('class', 'btn btn-success play-button disabled');

    ipcRenderer.send('launchGameWithMod', this.currentMod.toJSON());
  }

  constructor() {
    ipcRenderer.on('launcherClosed', event => {
      document.getElementById('play-button').innerHTML = 'Play';
      document.getElementById('play-button').setAttribute('class', 'btn btn-success play-button');
    });
  }

  ngOnInit() {
  }

}
