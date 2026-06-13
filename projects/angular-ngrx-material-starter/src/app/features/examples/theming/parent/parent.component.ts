import { Component, inject } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { AnimationsService } from '../../../../core/core.module';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'anms-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  imports: [TranslatePipe, ChildComponent]
})
export class ParentComponent {
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
}
