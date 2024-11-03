import * as assert from 'assert';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';

import {
  AnimationsService,
  AppState,
  LocalStorageService,
  TitleService
} from '../core.module';

import { SettingsEffects, SETTINGS_KEY } from './settings.effects';
import { SettingsState } from './settings.model';
import { actionSettingsChangeTheme } from './settings.actions';

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
  let ngZone: jest.Mocked<NgZone>;

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
    ngZone = {
      run: jest.fn((fn) => fn()),
      runOutsideAngular: jest.fn()
    } as unknown as jest.Mocked<NgZone>;
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
      const effect = new SettingsEffects(
        actions,
        store,
        router,
        overlayContainer,
        localStorageService,
        titleService,
        animationsService,
        translateService,
        ngZone
      );

      effect.persistSettings.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SETTINGS_KEY,
          settings
        );
      });
    });
  });
});
