import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../examples.state';
import { actionBooksDeleteOne, actionBooksUpsertOne } from './books.actions';
import { selectBooks } from './books.selectors';

export const BOOKS_KEY = 'EXAMPLES.BOOKS';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<State>>(Store);
  private localStorageService = inject(LocalStorageService);

  persistBooks = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionBooksUpsertOne, actionBooksDeleteOne),
        withLatestFrom(this.store.pipe(select(selectBooks))),
        tap(([actions, booksState]) =>
          this.localStorageService.setItem(BOOKS_KEY, booksState)
        )
      ),
    { dispatch: false }
  );
}
