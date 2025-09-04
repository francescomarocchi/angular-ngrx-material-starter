import { Routes } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { CrudComponent } from './crud/components/crud.component';
import { ExamplesComponent } from './examples/examples.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { ParentComponent } from './theming/parent/parent.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';

export const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosContainerComponent,
        data: { title: 'anms.examples.menu.todos' }
      },
      {
        path: 'stock-market',
        component: StockMarketContainerComponent,
        data: { title: 'anms.examples.menu.stocks' }
      },
      {
        path: 'theming',
        component: ParentComponent,
        data: { title: 'anms.examples.menu.theming' }
      },
      {
        path: 'crud',
        redirectTo: 'crud/',
        pathMatch: 'full'
      },
      {
        path: 'crud/:id',
        component: CrudComponent,
        data: { title: 'anms.examples.menu.crud' }
      },
      {
        path: 'form',
        component: FormComponent,
        data: { title: 'anms.examples.menu.form' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'anms.examples.menu.notifications' }
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./tables/components/tables.component').then(
            (m) => m.TablesComponent
          ),
        data: { title: 'anms.examples.menu.tables' }
      },
      {
        path: 'authenticated',
        component: AuthenticatedComponent,
        canActivate: [AuthGuardService],
        data: { title: 'anms.examples.menu.auth' }
      }
    ]
  }
];
