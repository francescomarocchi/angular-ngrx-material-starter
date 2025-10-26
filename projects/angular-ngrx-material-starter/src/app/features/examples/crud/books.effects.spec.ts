import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import { BookState } from './books.model';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { BOOKS_KEY, BooksEffects } from './books.effects';
import { actionBooksDeleteOne, actionBooksUpsertOne } from './books.actions';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockActions } from '@ngrx/effects/testing';

const scheduler = new TestScheduler((actual, expected) =>
  expect(actual).toEqual(expected)
);

describe('BooksEffects', () => {
  let effects: BooksEffects;
  describe('persistBooks', () => {
    const booksState: BookState = {
      entities: {
        firstBook: {
          author: 'Author',
          description: 'Description',
          id: '1',
          title: 'Title'
        }
      },
      ids: ['firstBook']
    };
    let localStorage: LocalStorageService;
    let store: Store<any>;

    beforeEach(() => {
      localStorage = { setItem: jest.fn() } as any;
      store = of({
        examples: {
          books: booksState
        }
      }) as any;

      TestBed.configureTestingModule({
        providers: [
          provideZonelessChangeDetection(),
          BooksEffects,
          { provide: LocalStorageService, useValue: localStorage },
          { provide: Store, useValue: store },
          { provide: Actions, useValue: EMPTY }
        ]
      });
    });

    test('should not dispatch any actions', () => {
      effects = TestBed.inject(BooksEffects);
      const metadata = getEffectsMetadata(effects);

      expect(metadata.persistBooks?.dispatch).toEqual(false);
    });

    test('should call setItem on LocalStorageService for delete one action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const action = actionBooksDeleteOne({ id: '1' });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        TestBed.overrideProvider(Actions, { useValue: actions });

        effects = TestBed.inject(BooksEffects);
        effects.persistBooks.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            BOOKS_KEY,
            booksState
          );
        });
      });
    });

    test('should call setItem on LocalStorageService for upsert one action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const action = actionBooksUpsertOne({ book: {} as any });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        TestBed.overrideProvider(Actions, { useValue: actions });

        effects = TestBed.inject(BooksEffects);
        effects.persistBooks.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            BOOKS_KEY,
            booksState
          );
        });
      });
    });
  });
});
