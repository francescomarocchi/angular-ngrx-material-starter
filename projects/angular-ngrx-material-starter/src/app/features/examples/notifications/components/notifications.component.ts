import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  AnimationsService,
  NotificationService
} from '../../../../core/core.module';

@Component({
  selector: 'anms-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NotificationsComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  animationsService = inject(AnimationsService);

  ngOnInit() {}

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
