import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import {
  AnimationsService,
  NotificationService
} from '../../../../core/core.module';
import { State } from '../../examples.state';
import { actionFormReset, actionFormUpdate } from '../form.actions';
import { Form } from '../form.model';
import { selectFormState } from '../form.selectors';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'anms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [TranslatePipe, SharedModule]
})
export class FormComponent {
  private fb = inject(UntypedFormBuilder);
  private store = inject<Store<State>>(Store);
  private translate = inject(TranslateService);
  private notificationService = inject(NotificationService);

  animationsService = inject(AnimationsService);

  form = this.fb.group({
    autosave: false,
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]
    ],
    requestGift: [''],
    birthday: ['', [Validators.required]],
    rating: [0, Validators.required]
  });

  formValueChanges$: Observable<Form> | undefined;

  ngOnInit() {
    this.formValueChanges$ = this.form.valueChanges.pipe(
      filter((form: Form) => form.autosave),
      tap((updatedForm) => this.update(updatedForm))
    );
    this.store
      .pipe(select(selectFormState), take(1))
      .subscribe((form) => this.form.patchValue(form.form));
  }

  update(form: Form) {
    this.store.dispatch(actionFormUpdate({ form }));
  }

  save() {
    this.store.dispatch(actionFormUpdate({ form: this.form.value }));
  }

  submit() {
    if (this.form.valid) {
      this.save();
      this.notificationService.info(
        (this.form.value.requestGift
          ? this.translate.instant('anms.examples.form.text4')
          : this.translate.instant('anms.examples.form.text5')) +
          ' : ' +
          this.translate.instant('anms.examples.form.text6')
      );
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    this.store.dispatch(actionFormReset());
  }
}
