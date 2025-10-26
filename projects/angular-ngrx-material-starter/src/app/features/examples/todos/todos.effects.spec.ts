import * as assert from 'assert';
import { Store } from '@ngrx/store';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../examples.state';
import { actionTodosToggle } from './todos.actions';
import { TodosEffects, TODOS_KEY } from './todos.effects';
import { TodosState } from './todos.model';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('TodosEffects', () => {
  let localStorage: jest.Mocked<LocalStorageService>;
  let store: jest.Mocked<Store<State>>;
  let effect: TodosEffects;

  beforeEach(() => {
    localStorage = {
      setItem: jest.fn()
    } as unknown as jest.Mocked<LocalStorageService>;
    store = {
      pipe: jest.fn()
    } as unknown as jest.Mocked<Store<State>>;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        TodosEffects,
        { provide: LocalStorageService, useValue: localStorage },
        { provide: Store, useValue: store },
        provideMockActions(() => EMPTY)
      ]
    });
  });

  describe('persistTodos', () => {
    it('should not dispatch any action', () => {
      const actions$ = new Actions();

      TestBed.overrideProvider(Actions, { useValue: actions$ });

      effect = TestBed.inject(TodosEffects);

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

        TestBed.overrideProvider(Actions, { useValue: actions });

        effect = TestBed.inject(TodosEffects);

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
