import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mod} from "../../../models/Mod";

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss']
})
export class ModComponent implements OnInit {

  @Input() mod: Mod;
  @Input() isSelected: boolean;
  isBeingHoveredOn: boolean = false;
  @Output() modClicked = new EventEmitter<Mod>();

  onModClick() {
    this.modClicked.emit(this.mod);
  }

  onMouseEnter() {
    if (!this.isSelected) {
      this.isBeingHoveredOn = true;
    }
  }

  onMouseLeave() {
    this.isBeingHoveredOn = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
