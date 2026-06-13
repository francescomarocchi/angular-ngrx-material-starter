import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, of as observableOf } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  AnimationsService,
  NotificationService
} from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';
import { State } from '../../examples.state';
import * as todoActions from '../todos.actions';
import { Todo, TodosFilter } from '../todos.model';
import { selectRemoveDoneTodosDisabled, selectTodos } from '../todos.selectors';
import { selectTodosFilter } from './../todos.selectors';

@Component({
  selector: 'anms-todos',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, SharedModule]
})
export class TodosContainerComponent implements OnInit {
  store = inject<Store<State>>(Store);
  snackBar = inject(MatSnackBar);
  translateService = inject(TranslateService);
  private notificationService = inject(NotificationService);
  animationsService = inject(AnimationsService);

  todos$: Observable<Todo[]> | undefined;
  filter$: Observable<TodosFilter> | undefined;
  removeDoneDisabled$: Observable<boolean> = observableOf(false);
  newTodo = '';

  get isAddTodoDisabled() {
    return this.newTodo.length < 4;
  }

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectTodos));
    this.filter$ = this.store.pipe(select(selectTodosFilter));
    this.removeDoneDisabled$ = this.store.pipe(
      select(selectRemoveDoneTodosDisabled)
    );
  }

  onNewTodoChange(event: any) {
    this.newTodo = event.target.value;
  }

  onNewTodoClear() {
    this.newTodo = '';
  }

  onAddTodo() {
    this.store.dispatch(todoActions.actionTodosAdd(this.newTodo));
    const addedMessage = this.translateService.instant(
      'anms.examples.todos.added.notification',
      { name: this.newTodo }
    );
    this.notificationService.info(addedMessage);
    this.newTodo = '';
  }

  onToggleTodo(todo: Todo) {
    this.store.dispatch(todoActions.actionTodosToggle({ id: todo.id }));
    const newStatus = this.translateService.instant(
      `anms.examples.todos.filter.${todo.done ? 'active' : 'done'}`
    );
    const undo = this.translateService.instant('anms.examples.todos.undo');
    const toggledMessage = this.translateService.instant(
      'anms.examples.todos.toggle.notification',
      { name: todo.name }
    );

    this.snackBar
      .open(`${toggledMessage} ${newStatus}`, undo, {
        duration: 2500,
        panelClass: 'todos-notification-overlay'
      })
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.onToggleTodo({ ...todo, done: !todo.done }));
  }

  onRemoveDoneTodos() {
    this.store.dispatch(todoActions.actionTodosRemoveDone());
    const removedMessage = this.translateService.instant(
      'anms.examples.todos.remove.notification'
    );
    this.notificationService.info(removedMessage);
  }

  onFilterTodos(filter: TodosFilter) {
    this.store.dispatch(todoActions.actionTodosFilter({ filter }));
    const filterToMessage = this.translateService.instant(
      'anms.examples.todos.filter.notification'
    );
    const filterMessage = this.translateService.instant(
      `anms.examples.todos.filter.${filter.toLowerCase()}`
    );
    this.notificationService.info(`${filterToMessage} ${filterMessage}`);
  }
}
