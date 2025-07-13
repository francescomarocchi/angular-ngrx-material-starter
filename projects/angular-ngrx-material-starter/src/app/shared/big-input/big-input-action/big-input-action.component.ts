import {
  Component,
  ChangeDetectionStrategy,
  input,
  output
} from '@angular/core';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'anms-big-input-action',
  templateUrl: './big-input-action.component.html',
  styleUrls: ['./big-input-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BigInputActionComponent {
  readonly disabled = input(false);
  readonly fontSet = input('');
  readonly fontIcon = input('');
  readonly faIcon = input.required<IconProp>();
  readonly label = input('');
  readonly color = input('');

  readonly action = output<void>();

  hasFocus = false;

  onClick() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.action.emit();
  }
}
