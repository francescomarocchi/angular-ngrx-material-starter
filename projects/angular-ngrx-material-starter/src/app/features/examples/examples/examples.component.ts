import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ExamplesComponent {
  private store = inject<Store<State>>(Store);

  isAuthenticated$: Observable<boolean> | undefined;

  examples = [
    { link: 'todos', label: 'anms.examples.menu.todos' },
    { link: 'stock-market', label: 'anms.examples.menu.stocks' },
    { link: 'theming', label: 'anms.examples.menu.theming' },
    { link: 'crud', label: 'anms.examples.menu.crud' },
    { link: 'form', label: 'anms.examples.menu.form' },
    { link: 'tables', label: 'anms.examples.menu.tables' },
    { link: 'notifications', label: 'anms.examples.menu.notifications' },
    { link: 'authenticated', label: 'anms.examples.menu.auth', auth: true }
  ];

  constructor() {
    effect(() => {
      this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    });
  }
}
