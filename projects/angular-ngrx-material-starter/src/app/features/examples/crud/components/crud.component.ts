import { Component, inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AnimationsService } from '../../../../core/core.module';
import { State } from '../../examples.state';
import { actionBooksDeleteOne, actionBooksUpsertOne } from '../books.actions';
import { Book } from '../books.model';
import { selectAllBooks, selectSelectedBook } from '../books.selectors';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  imports: [TranslatePipe, SharedModule]
})
export class CrudComponent {
  store = inject<Store<State>>(Store);
  fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  animationsService = inject(AnimationsService);

  bookFormGroup = this.fb.group(CrudComponent.createBook());
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));
  selectedBook$: Observable<Book | undefined> = this.store.pipe(
    select(selectSelectedBook)
  );

  isEditing = false;

  static createBook(): Book {
    return {
      id: uuid(),
      title: '',
      author: '',
      description: ''
    };
  }

  select(book: Book) {
    this.isEditing = false;
    this.router.navigate(['examples/crud', book.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  edit(book: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }

  addNew() {
    this.bookFormGroup.reset();
    this.bookFormGroup.setValue(CrudComponent.createBook());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(book: Book) {
    this.store.dispatch(actionBooksDeleteOne({ id: book.id }));
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  save() {
    if (this.bookFormGroup.valid) {
      const book = this.bookFormGroup.value;
      this.store.dispatch(actionBooksUpsertOne({ book }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', book.id]);
    }
  }
}
