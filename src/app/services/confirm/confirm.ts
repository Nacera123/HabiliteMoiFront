import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ConfirmService {

  visible = signal(false);
  message = signal('');

  private resolver!: (value: boolean) => void;

  ask(message: string): Promise<boolean> {
    this.message.set(message);
    this.visible.set(true);
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  confirm(): void {
    this.visible.set(false);
    this.resolver(true);
  }

  cancel(): void {
    this.visible.set(false);
    this.resolver(false);
  };
}

