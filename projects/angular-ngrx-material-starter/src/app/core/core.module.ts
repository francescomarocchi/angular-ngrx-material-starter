import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from '@angular/common/http';
import { ErrorHandler, NgModule, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  faGithub,
  faInstagram,
  faMediumM,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faCog,
  faPlayCircle,
  faPowerOff,
  faRocket,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AnimationsService } from './animations/animations.service';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';
import { AuthGuardService } from './auth/auth-guard.service';
import { authLogin, authLogout } from './auth/auth.actions';
import { selectAuth, selectIsAuthenticated } from './auth/auth.selectors';
import { AppState } from './core.state';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { LocalStorageService } from './local-storage/local-storage.service';
import { NotificationService } from './notifications/notification.service';
import {
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './settings/settings.selectors';
import { TitleService } from './title/title.service';

export {
  AnimationsService,
  AppState,
  AuthGuardService,
  LocalStorageService,
  NotificationService,
  ROUTE_ANIMATIONS_ELEMENTS,
  TitleService,
  authLogin,
  authLogout,
  routeAnimations,
  selectAuth,
  selectEffectiveTheme,
  selectIsAuthenticated,
  selectSettingsLanguage,
  selectSettingsStickyHeader
};

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  declarations: [],
  exports: [
    // angular
    FormsModule,
    // material
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatButtonModule,
    // 3rd party
    FontAwesomeModule,
    TranslateModule
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    // material
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatButtonModule,
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material Starter'
        }),
    // 3rd party
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    provideHttpClient(withInterceptorsFromDi(), withFetch())
  ]
})
export class CoreModule {
  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true });
    const faIconLibrary = inject(FaIconLibrary);

    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    faIconLibrary.addIcons(
      faCog,
      faBars,
      faRocket,
      faPowerOff,
      faUserCircle,
      faPlayCircle,
      faGithub,
      faMediumM,
      faTwitter,
      faInstagram,
      faYoutube
    );
  }
}
