import { Component, inject } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { AnimationsService } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [TranslatePipe, SharedModule]
})
export class AboutComponent {
  animationsService = inject(AnimationsService);
  releaseButler = 'assets/release-butler.png';
}
