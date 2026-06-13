import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from '../../../core/core.module';

import { State } from '../examples.state';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewTransitionScopeDirective } from '../../../core/router/transition-scope.directive';

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  imports: [
    TranslatePipe,
    SharedModule,
    RouterModule,
    ViewTransitionScopeDirective
  ]
})
export class ExamplesComponent {
  isAuthenticated$: Observable<boolean> | undefined;

  examples: {
    label: string;
    link: string;
    auth?: boolean;
  }[] = [
    { link: 'todos', label: 'anms.examples.menu.todos' },
    { link: 'stock-market', label: 'anms.examples.menu.stocks' },
    { link: 'theming', label: 'anms.examples.menu.theming' },
    { link: 'crud', label: 'anms.examples.menu.crud' },
    { link: 'form', label: 'anms.examples.menu.form' },
    { link: 'tables', label: 'anms.examples.menu.tables' },
    { link: 'notifications', label: 'anms.examples.menu.notifications' },
    { link: 'authenticated', label: 'anms.examples.menu.auth', auth: true }
  ];

  private store = inject<Store<State>>(Store);

  constructor() {
    effect(() => {
      this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    });
  }
}
