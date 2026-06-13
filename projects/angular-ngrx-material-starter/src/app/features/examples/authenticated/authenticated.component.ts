import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AnimationsService } from '../../../core/core.module';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'anms-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
  imports: [TranslatePipe]
})
export class AuthenticatedComponent {
  animationsService = inject(AnimationsService);
}
