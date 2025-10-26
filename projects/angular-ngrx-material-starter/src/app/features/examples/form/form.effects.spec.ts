import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { ReplaySubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { LocalStorageService } from '../../../core/core.module';

import { FORM_KEY, FormEffects } from './form.effects';
import { Form } from './form.model';
import { actionFormUpdate } from './form.actions';

const scheduler = new TestScheduler((actual, expected) =>
  expect(actual).toEqual(expected)
);

describe('FormEffects', () => {
  let localStorageService: jest.Mocked<LocalStorageService>;
  let actions$: ReplaySubject<Actions>;
  let effect: FormEffects;

  beforeEach(() => {
    actions$ = new ReplaySubject<Actions>(1);
    localStorageService = {
      setItem: jest.fn()
    } as unknown as jest.Mocked<LocalStorageService>;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        FormEffects,
        {
          provide: LocalStorageService,
          useValue: localStorageService
        },
        {
          provide: Actions,
          useValue: actions$
        }
      ]
    });

    effect = TestBed.inject(FormEffects);
  });

  describe('persistForm', () => {
    it('should not dispatch any action', () => {
      const metadata = getEffectsMetadata(effect);

      expect(metadata.persistForm?.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService for UPDATE action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const form: Form = {
          autosave: false,
          username: 'test',
          password: 'test',
          email: 'test@test.test',
          description: 'It is a test.',
          requestGift: true,
          birthday: new Date(),
          rating: 10
        };
        const action = actionFormUpdate({ form });
        const source = cold('a', { a: action });

        effect.persistForm.subscribe(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(FORM_KEY, {
            form
          });
        });
      });
    });
  });
});
