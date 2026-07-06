import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './menu-button.html',
  styleUrl: './menu-button.css',
})
export class MenuButton {
   @Output() menuClick = new EventEmitter<void>();
}
