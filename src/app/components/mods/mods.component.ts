import {Component, Input, OnInit} from '@angular/core';
import {Mod} from "../../models/Mod";

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.scss']
})
export class ModsComponent implements OnInit {

  @Input() mods: Mod[];

  constructor() { }

  ngOnInit() {
  }

}
