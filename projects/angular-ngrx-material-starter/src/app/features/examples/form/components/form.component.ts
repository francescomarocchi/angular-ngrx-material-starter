import { Component, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormField,
  FormRoot,
  email,
  form,
  maxLength,
  minLength,
  required,
  submit
} from '@angular/forms/signals';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import {
  AnimationsService,
  NotificationService
} from '../../../../core/core.module';
import { State } from '../../examples.state';
import { actionFormReset, actionFormUpdate } from '../form.actions';
import { Form } from '../form.model';
import { selectFormState } from '../form.selectors';
import { SharedModule } from '../../../../shared/shared.module';

const EMPTY_FORM: Form = {
  autosave: false,
  username: '',
  password: '',
  email: '',
  description: '',
  requestGift: false,
  birthday: null,
  rating: 0
};

const TRANSLATION_KEYS = {
  title: 'anms.examples.form.title',
  subtitle: 'anms.examples.form.subtitle1',
  autosave: 'anms.examples.form.autosave',
  username: 'anms.examples.form.placeholder1',
  password: 'anms.examples.form.placeholder2',
  email: 'anms.examples.form.placeholder3',
  description: 'anms.examples.form.placeholder4',
  birthday: 'anms.examples.form.placeholder5',
  required: 'anms.examples.form.error1',
  invalidEmail: 'anms.examples.form.error2',
  minLength: 'anms.examples.form.error3',
  maxLength: 'anms.examples.form.error4',
  rating: 'anms.examples.form.text2',
  requestGift: 'anms.examples.form.text1',
  send: 'anms.examples.form.send',
  save: 'anms.examples.form.save',
  reset: 'anms.examples.form.reset'
};

@Component({
  selector: 'anms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [SharedModule, FormField, FormRoot]
})
export class FormComponent {
  private store = inject<Store<State>>(Store);
  private translate = inject(TranslateService);
  private notificationService = inject(NotificationService);

  animationsService = inject(AnimationsService);

  readonly translations = toSignal(
    this.translate.stream(Object.values(TRANSLATION_KEYS)).pipe(
      map((translations: Record<string, string>) => ({
        title: translations[TRANSLATION_KEYS.title],
        subtitle: translations[TRANSLATION_KEYS.subtitle],
        autosave: translations[TRANSLATION_KEYS.autosave],
        username: translations[TRANSLATION_KEYS.username],
        password: translations[TRANSLATION_KEYS.password],
        email: translations[TRANSLATION_KEYS.email],
        description: translations[TRANSLATION_KEYS.description],
        birthday: translations[TRANSLATION_KEYS.birthday],
        required: translations[TRANSLATION_KEYS.required],
        invalidEmail: translations[TRANSLATION_KEYS.invalidEmail],
        minLength: translations[TRANSLATION_KEYS.minLength],
        maxLength: translations[TRANSLATION_KEYS.maxLength],
        rating: translations[TRANSLATION_KEYS.rating],
        requestGift: translations[TRANSLATION_KEYS.requestGift],
        send: translations[TRANSLATION_KEYS.send],
        save: translations[TRANSLATION_KEYS.save],
        reset: translations[TRANSLATION_KEYS.reset]
      }))
    ),
    { initialValue: TRANSLATION_KEYS }
  );

  private readonly model = signal<Form>({ ...EMPTY_FORM });

  readonly form = form(this.model, (path) => {
    required(path.username);
    required(path.password);
    required(path.email);
    email(path.email);
    required(path.description);
    minLength(path.description, 10);
    maxLength(path.description, 1000);
    required(path.birthday);
    required(path.rating);
  });

  constructor() {
    const savedForm = this.store.selectSignal(selectFormState)().form;
    this.model.set({
      ...EMPTY_FORM,
      ...savedForm,
      requestGift: savedForm.requestGift,
      birthday: savedForm.birthday ? new Date(savedForm.birthday) : null
    });

    let previousValue = this.model();
    effect(() => {
      const value = this.model();
      if (value !== previousValue) {
        previousValue = value;
        if (value.autosave) {
          untracked(() => this.update(value));
        }
      }
    });
  }

  update(form: Form) {
    this.store.dispatch(actionFormUpdate({ form }));
  }

  save() {
    this.update(this.model());
  }

  submit() {
    return submit(this.form, async () => {
      this.save();
      this.notificationService.info(
        (this.model().requestGift
          ? this.translate.instant('anms.examples.form.text4')
          : this.translate.instant('anms.examples.form.text5')) +
          ' : ' +
          this.translate.instant('anms.examples.form.text6')
      );
    });
  }

  reset() {
    this.form().reset({ ...EMPTY_FORM });
    this.store.dispatch(actionFormReset());
  }
}
