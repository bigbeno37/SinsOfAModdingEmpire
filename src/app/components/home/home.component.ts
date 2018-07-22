// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';
import Mod from "../../../models/Mod";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modsListSize = 3;
  modDetailsSize = 12 - this.modsListSize;

  mods: Mod[];
  currentMod: Mod;

  updateModDetails(event: Mod) {
    this.currentMod = event;

    this.updateBackground();
  }

  private updateBackground() {
    (document.getElementsByClassName('bg')[0] as HTMLElement)
      .style.backgroundImage = "url('assets/" + this.currentMod.backgroundPictures[0] + "')";
  }

  constructor() {
    this.mods = remote.getGlobal('mods');
    if (this.mods.length > 0) {
      this.currentMod = this.mods[0];
    }
  }

  ngOnInit() {
    this.updateBackground();
  }

}
