import * as assert from 'assert';
import { Store } from '@ngrx/store';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../examples.state';
import { actionTodosToggle } from './todos.actions';
import { TodosEffects, TODOS_KEY } from './todos.effects';
import { TodosState } from './todos.model';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('TodosEffects', () => {
  let localStorage: jest.Mocked<LocalStorageService>;
  let store: jest.Mocked<Store<State>>;

  beforeEach(() => {
    localStorage = {
      setItem: jest.fn()
    } as unknown as jest.Mocked<LocalStorageService>;
    store = {
      pipe: jest.fn()
    } as unknown as jest.Mocked<Store<State>>;
  });

  describe('persistTodos', () => {
    it('should not dispatch any action', () => {
      const actions$ = new Actions();
      const effect = new TodosEffects(actions$, store, localStorage);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.persistTodos?.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService for any action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;

        const todosState: TodosState = {
          items: [{ id: '1', name: 'Test ToDo', done: false }],
          filter: 'ALL'
        };
        store.pipe.mockReturnValue(of(todosState));
        const persistAction = actionTodosToggle({ id: 'a' });
        const source = cold('a', { a: persistAction });
        const actions = new Actions(source);
        const effect = new TodosEffects(actions, store, localStorage);

        effect.persistTodos.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            TODOS_KEY,
            todosState
          );
        });
      });
    });
  });
});
