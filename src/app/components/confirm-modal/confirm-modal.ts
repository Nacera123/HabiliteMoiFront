import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmService } from '../../services/confirm/confirm';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {

  constructor(public confirmService: ConfirmService) {}
}
