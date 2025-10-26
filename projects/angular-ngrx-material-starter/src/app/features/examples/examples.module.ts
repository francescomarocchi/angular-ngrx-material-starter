import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  provideTranslateHttpLoader,
  TranslateHttpLoader
} from '@ngx-translate/http-loader';

import { environment } from '../../../environments/environment';
import { SharedModule } from '../../shared/shared.module';

import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { BooksEffects } from './crud/books.effects';
import { CrudComponent } from './crud/components/crud.component';
import { routes } from './examples-routing.routes';
import { ExamplesEffects } from './examples.effects';
import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesComponent } from './examples/examples.component';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ChildComponent } from './theming/child/child.component';
import { ParentComponent } from './theming/parent/parent.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    TranslateModule.forChild({
      loader: provideTranslateHttpLoader({
        prefix: `${environment.i18nPrefix}/assets/i18n/examples/`,
        suffix: '.json'
      }),
      isolate: true
    }),
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  declarations: [
    ExamplesComponent,
    TodosContainerComponent,
    StockMarketContainerComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    CrudComponent,
    FormComponent,
    NotificationsComponent
  ],
  providers: [
    StockMarketService,
    provideRouter(routes),
    provideState(FEATURE_NAME, reducers),
    provideEffects([
      ExamplesEffects,
      TodosEffects,
      StockMarketEffects,
      BooksEffects,
      FormEffects
    ])
  ]
})
export class ExamplesModule {}
