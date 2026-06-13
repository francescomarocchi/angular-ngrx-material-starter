import { Component, inject } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import {
  AnimationsService,
  NotificationService
} from '../../../../core/core.module';

@Component({
  selector: 'anms-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  imports: [TranslatePipe]
})
export class NotificationsComponent {
  private readonly notificationService = inject(NotificationService);
  animationsService = inject(AnimationsService);

  default() {
    this.notificationService.default('Default message');
  }

  info() {
    this.notificationService.info('Info message');
  }

  success() {
    this.notificationService.success('Success message');
  }

  warn() {
    this.notificationService.warn('Warning message');
  }

  error() {
    this.notificationService.error('Error message');
  }
}
