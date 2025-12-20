import { expect } from 'vitest';
import { ActivationEnd, Router } from '@angular/router';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';

import { TitleService } from '../../core/core.module';

import { actionSettingsChangeLanguage } from '../../core/settings/settings.actions';

import { ExamplesEffects } from './examples.effects';
import { State } from './examples.state';
import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

const scheduler = new TestScheduler((actual, expected) =>
  expect(actual).toEqual(expected)
);

describe('SettingsEffects', () => {
  let router: any;
  let titleService: jest.Mocked<TitleService>;
  let translateService: jest.Mocked<TranslateService>;
  let store: jest.Mocked<Store<State>>;
  let effect: ExamplesEffects;

  beforeEach(() => {
    router = {
      routerState: {
        snapshot: {
          root: {}
        }
      },
      events: {
        pipe: jest.fn()
      }
    };

    titleService = {
      setTitle: jest.fn()
    } as unknown as jest.Mocked<TitleService>;
    translateService = {
      use: jest.fn()
    } as unknown as jest.Mocked<TranslateService>;
    store = {
      pipe: jest.fn()
    } as unknown as jest.Mocked<Store<State>>;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ExamplesEffects,
        { provide: TranslateService, useValue: translateService },
        { provide: Store, useValue: store },
        { provide: TitleService, useValue: titleService },
        { provide: Actions, useValue: EMPTY },
        { provide: Router, useValue: router }
      ]
    });
  });

  describe('setTranslateServiceLanguage', () => {
    it('should not dispatch action', () => {
      effect = TestBed.inject(ExamplesEffects);

      const metadata = getEffectsMetadata(effect);
      expect(metadata.setTranslateServiceLanguage?.dispatch).toEqual(false);
    });
  });

  describe('setTitle', () => {
    it('should not dispatch action', () => {
      const actions = new Actions<any>();

      TestBed.overrideProvider(Actions, { useValue: actions });

      effect = TestBed.inject(ExamplesEffects);

      const metadata = getEffectsMetadata(effect);

      expect(metadata.setTitle?.dispatch).toEqual(false);
    });

    it('should setTitle', () => {
      scheduler.run((helpers) => {
        const { cold, hot } = helpers;
        const action = actionSettingsChangeLanguage({ language: 'en' });
        const actions = hot('-a', { a: action });

        const routerEvent = new ActivationEnd(router.routerState.snapshot);
        router.events = cold('a', { a: routerEvent });

        TestBed.overrideProvider(Actions, { useValue: actions });
        TestBed.overrideProvider(Router, { useValue: router });

        effect = TestBed.inject(ExamplesEffects);

        effect.setTitle.subscribe(() => {
          expect(titleService.setTitle).toHaveBeenCalled();
          expect(titleService.setTitle).toHaveBeenCalledWith(
            router.routerState.snapshot.root,
            translateService
          );
        });
      });
    });
  });
});
