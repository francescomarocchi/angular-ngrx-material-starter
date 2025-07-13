import * as assert from 'assert';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

import {
  AnimationsService,
  AppState,
  LocalStorageService,
  TitleService
} from '../core.module';

import { SETTINGS_KEY, SettingsEffects } from './settings.effects';
import { SettingsState } from './settings.model';
import { actionSettingsChangeTheme } from './settings.actions';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('SettingsEffects', () => {
  let router: any;
  let localStorageService: jest.Mocked<LocalStorageService>;
  let overlayContainer: jest.Mocked<OverlayContainer>;
  let titleService: jest.Mocked<TitleService>;
  let animationsService: jest.Mocked<AnimationsService>;
  let translateService: jest.Mocked<TranslateService>;
  let store: jest.Mocked<Store<AppState>>;
  let effect: SettingsEffects;

  beforeEach(() => {
    router = {
      routerState: {
        snapshot: {}
      },
      events: {
        pipe: jest.fn()
      }
    };
    localStorageService = {
      setItem: jest.fn()
    } as unknown as jest.Mocked<LocalStorageService>;
    overlayContainer = {
      getContainerElement: jest.fn()
    } as unknown as jest.Mocked<OverlayContainer>;
    titleService = {
      setTitle: jest.fn()
    } as unknown as jest.Mocked<TitleService>;
    animationsService = {
      updateRouteAnimationType: jest.fn()
    } as unknown as jest.Mocked<AnimationsService>;
    translateService = {
      use: jest.fn()
    } as unknown as jest.Mocked<TranslateService>;
    store = {
      pipe: jest.fn()
    } as unknown as jest.Mocked<Store<AppState>>;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        SettingsEffects,
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: OverlayContainer, useValue: overlayContainer },
        { provide: TitleService, useValue: titleService },
        { provide: AnimationsService, useValue: animationsService },
        { provide: TranslateService, useValue: translateService },
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        provideMockActions(() => EMPTY)
      ]
    });
  });

  it('should call methods on LocalStorageService for PERSIST action', () => {
    scheduler.run((helpers) => {
      const { cold } = helpers;

      const settings: SettingsState = {
        language: 'en',
        pageAnimations: true,
        elementsAnimations: true,
        theme: 'default',
        nightTheme: 'default',
        autoNightMode: false,
        stickyHeader: false,
        pageAnimationsDisabled: true,
        hour: 12
      };
      store.pipe.mockReturnValue(of(settings));
      const persistAction = actionSettingsChangeTheme({ theme: 'DEFAULT' });
      const source = cold('a', { a: persistAction });
      const actions = new Actions(source);

      TestBed.overrideProvider(Actions, { useValue: actions });

      effect = TestBed.inject(SettingsEffects);

      effect.persistSettings.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SETTINGS_KEY,
          settings
        );
      });
    });
  });
});
