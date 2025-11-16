import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';

import { AnimationsService } from '../../../../core/core.module';

@Component({
  selector: 'anms-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ParentComponent implements OnInit {
  themeSrc = `@use '@angular/material' as mat;

@mixin anms-parent-component-theme($theme) {
  anms-parent {
    > .container {
      > .row {
        > .col-md-6 {
          > .example {
            border-color: mat.get-theme-color($theme, error);

            > h1 {
              color: mat.get-theme-color($theme, error);
            }
          }
        }
      }
    }
  }
}`;
  animationsService = inject(AnimationsService);

  constructor() {}

  ngOnInit() {}
}
