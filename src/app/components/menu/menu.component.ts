import {Component, Input, OnInit} from '@angular/core';
import { ipcRenderer } from 'electron';
import {Mod} from "../../models/Mod";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() currentMod: Mod;

  onPlayClicked() {
    ipcRenderer.send('launchGameWithMod', this.currentMod);
  }

  constructor() { }

  ngOnInit() {
  }

}
