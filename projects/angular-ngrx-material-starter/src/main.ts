import {
  enableProdMode,
  importProvidersFrom,
  provideZonelessChangeDetection
} from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app/app.component';
import { CoreModule } from './app/core/core.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(CoreModule),
    importProvidersFrom(AppRoutingModule),
    provideZonelessChangeDetection()
  ]
});
