import {
  enableProdMode,
  importProvidersFrom,
  provideZonelessChangeDetection
} from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app-routing.routes';
import { AppComponent } from './app/app/app.component';
import { AuthEffects } from './app/core/auth/auth.effects';
import { CoreModule } from './app/core/core.module';
import { reducers } from './app/core/core.state';
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
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(CoreModule),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled'
      }),
      withPreloading(PreloadAllModules)
    ),
    provideStore({ ...reducers, router: routerReducer }),
    provideRouterStore({
      serializer: CustomSerializer
    }),
    provideEffects([AuthEffects, SettingsEffects, GoogleAnalyticsEffects]),
    provideZonelessChangeDetection()
  ]
});
