import {
  enableProdMode,
  importProvidersFrom,
  provideZonelessChangeDetection
} from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app-routing.routes';
import { AppComponent } from './app/app/app.component';
import { AuthEffects } from './app/core/auth/auth.effects';
import { CoreModule } from './app/core/core.module';
import { metaReducers, reducers } from './app/core/core.state';
import { GoogleAnalyticsEffects } from './app/core/google-analytics/google-analytics.effects';
import { CustomSerializer } from './app/core/router/custom-serializer';
import { SettingsEffects } from './app/core/settings/settings.effects';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(CoreModule),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      }),
      withPreloading(PreloadAllModules),
      withViewTransitions()
    ),
    provideStore(reducers, {
      metaReducers
    }),
    provideRouterStore({
      serializer: CustomSerializer
    }),
    provideEffects([AuthEffects, SettingsEffects, GoogleAnalyticsEffects]),
    provideZonelessChangeDetection()
  ]
}).catch(console.error);
