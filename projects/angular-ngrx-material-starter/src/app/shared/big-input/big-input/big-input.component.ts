import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'anms-big-input',
  templateUrl: './big-input.component.html',
  styleUrls: ['./big-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BigInputComponent {
  readonly placeholder = input('');

  readonly value = input('');

  readonly disabled = input(false);

  hasFocus = false;
}
