import { Injectable, NgZone, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  default(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'info-notification-overlay'
    });
  }

  success(message: string) {
    this.show(message, {
      duration: 2000,
      panelClass: 'success-notification-overlay'
    });
  }

  warn(message: string) {
    this.show(message, {
      duration: 2500,
      panelClass: 'warning-notification-overlay'
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 3000,
      panelClass: 'error-notification-overlay'
    });
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    this.snackBar.open(message, undefined, configuration);
  }
}
