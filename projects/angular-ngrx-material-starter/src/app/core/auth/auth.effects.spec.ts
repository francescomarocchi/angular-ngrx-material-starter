import * as assert from 'assert';
import { Router } from '@angular/router';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { authLogin, authLogout } from './auth.actions';
import { AUTH_KEY, AuthEffects } from './auth.effects';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('AuthEffects', () => {
  let actions$: ReplaySubject<Actions>;
  let localStorageService: jest.Mocked<LocalStorageService>;
  let router: jest.Mocked<Router>;
  let effect: AuthEffects;

  beforeEach(() => {
    actions$ = new ReplaySubject<Actions>(1);
    localStorageService = {
      setItem: jest.fn()
    } as unknown as jest.Mocked<LocalStorageService>;
    router = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: localStorageService
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    });

    effect = TestBed.inject(AuthEffects);
  });

  describe('login', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(effect);

      expect(metadata.login?.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const loginAction = authLogin();
        const source = cold('a', { a: loginAction });

        effect.login.subscribe(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, {
            isAuthenticated: true
          });
        });
      });
    });
  });

  describe('logout', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(effect);

      expect(metadata.logout?.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService and navigate to about', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const logoutAction = authLogout();
        const source = cold('a', { a: logoutAction });

        effect.logout.subscribe(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(AUTH_KEY, {
            isAuthenticated: false
          });
          expect(router.navigate).toHaveBeenCalledWith(['']);
        });
      });
    });
  });
});
