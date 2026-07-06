import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmModal } from './components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ConfirmModal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HabiliteMoiFront');
}
