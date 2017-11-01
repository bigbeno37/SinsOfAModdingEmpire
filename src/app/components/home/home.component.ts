import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';
import {Mod} from "../../models/Mod";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;
  modsListSize = 3;
  modDetailsSize = 12 - this.modsListSize;

  // mods: Mod[] = [ new Mod("Star Trek: Armada III", "Someone", "A total conversion mod for Sins of a Solar Empire", ""),
  //                 new Mod("Sins of a Solar Empire", "Ironclad Studios", "The base game", ""),
  // ];

  mods: Mod[] = [];
  currentMod: Mod;

  updateModDetails(event: Mod) {
    this.currentMod = event;
  }

  constructor() {
    this.mods = remote.getGlobal('mods');
    this.currentMod = this.mods[0];
  }

  ngOnInit() {
  }

}
