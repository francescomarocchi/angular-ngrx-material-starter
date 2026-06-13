import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { ViewTransitionScopeDirective } from '../../core/router/transition-scope.directive';
import { BooksEffects } from './crud/books.effects';
import { routes } from './examples-routing.routes';
import { ExamplesEffects } from './examples.effects';
import { FEATURE_NAME, reducers } from './examples.state';
import { FormEffects } from './form/form.effects';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { TodosEffects } from './todos/todos.effects';
import { provideTranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.test';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ViewTransitionScopeDirective
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
    ]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: `${environment.i18nPrefix}/assets/i18n/examples/`,
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
})
export class ExamplesModule {}
