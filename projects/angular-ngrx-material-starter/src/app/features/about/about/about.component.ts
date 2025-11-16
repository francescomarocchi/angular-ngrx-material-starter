import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject
} from '@angular/core';

import { AnimationsService } from '../../../core/core.module';

@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AboutComponent {
  animationsService = inject(AnimationsService);
  releaseButler = 'assets/release-butler.png';
}
