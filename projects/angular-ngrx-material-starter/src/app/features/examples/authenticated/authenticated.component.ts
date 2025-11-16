import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';

import { AnimationsService } from '../../../core/core.module';

@Component({
  selector: 'anms-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AuthenticatedComponent implements OnInit {
  animationsService = inject(AnimationsService);

  constructor() {}

  ngOnInit() {}
}
