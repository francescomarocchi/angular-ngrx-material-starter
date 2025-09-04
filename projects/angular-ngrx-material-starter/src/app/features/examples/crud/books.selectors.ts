import { createSelector } from '@ngrx/store';

import { selectExamples, ExamplesState } from '../examples.state';

import { bookAdapter } from './books.reducer';
import { getRouterSelectors } from '@ngrx/router-store';

const { selectEntities, selectAll } = bookAdapter.getSelectors();

export const selectBooks = createSelector(
  selectExamples,
  (state: ExamplesState) => state.books
);

export const selectAllBooks = createSelector(selectBooks, selectAll);
export const selectBooksEntities = createSelector(selectBooks, selectEntities);
const { selectRouteParams } = getRouterSelectors();

export const selectSelectedBook = createSelector(
  selectBooksEntities,
  selectRouteParams,
  (entities, params) => params && entities[params.id]
);
