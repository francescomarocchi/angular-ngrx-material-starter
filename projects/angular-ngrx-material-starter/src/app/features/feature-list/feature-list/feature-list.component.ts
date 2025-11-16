import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';

import { AnimationsService } from '../../../core/core.module';

import { Feature, features } from '../feature-list.data';

@Component({
  selector: 'anms-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class FeatureListComponent implements OnInit {
  animationsService = inject(AnimationsService);
  features: Feature[] = features;

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
