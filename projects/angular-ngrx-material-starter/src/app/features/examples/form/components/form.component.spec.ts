import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { NotificationService } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';

import { Form } from '../form.model';
import { selectFormState } from '../form.selectors';
import { FormComponent } from './form.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideZonelessChangeDetection } from '@angular/core';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { actionFormReset, actionFormUpdate } from '../form.actions';
import { initialState } from '../form.reducer';

import * as vitest from 'vitest';

describe('FormComponent', () => {
  let store: MockStore;
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let dispatchSpy: vitest.vi.SpyInstance;
  let loader: HarnessLoader;
  let notificationSpy: jest.SpyInstance;

  const emptyForm: Form = {
    autosave: false,
    username: '',
    password: '',
    email: '',
    description: '',
    requestGift: false,
    birthday: null,
    rating: 0
  };

  const validForm: Form = {
    autosave: false,
    username: 'tomastrajan',
    password: 'password',
    email: 'test@example.com',
    description: 'A valid description',
    requestGift: true,
    birthday: new Date(2000, 0, 2),
    rating: 5
  };

  const getInput = async (fieldName: string): Promise<MatInputHarness> => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    for (const input of inputs) {
      if ((await input.getId()) === fieldName) {
        return input;
      }
    }
    throw new Error(`Input not found: ${fieldName}`);
  };

  const createComponent = (savedForm: Form = initialState.form) => {
    store.overrideSelector(selectFormState, { form: savedForm });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  };

  const getSaveButton = () =>
    loader.getHarness(
      MatButtonHarness.with({ text: 'anms.examples.form.save' })
    );

  const getResetButton = async () =>
    loader.getHarness(
      MatButtonHarness.with({ text: 'anms.examples.form.reset' })
    );

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormComponent],
      providers: [
        provideMockStore(),
        NotificationService,
        provideZonelessChangeDetection(),
        provideTranslateService()
      ]
    });

    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    notificationSpy = jest.spyOn(TestBed.inject(NotificationService), 'info');
    createComponent();
  });

  it('should save form', async () => {
    const usernameInput = await getInput('username');
    const saveButton = await getSaveButton();

    await usernameInput.setValue('tomastrajan');
    await saveButton.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0].type).toBe('[Form] Update');
    expect(dispatchSpy.mock.calls[0][0].form).toEqual({
      ...emptyForm,
      username: 'tomastrajan'
    });
  });

  it('should reset form', async () => {
    const usernameInput = await getInput('username');
    const resetButton = await getResetButton();

    await usernameInput.setValue('tomastrajan');
    await resetButton.click();
    const usernameValue = await usernameInput.getValue();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0].type).toBe('[Form] Reset');
    expect(usernameValue).toBe('');
    expect(component.form().value()).toEqual(emptyForm);
    expect(component.form().dirty()).toBe(false);
    expect(component.form().touched()).toBe(false);
    expect(component.form.username().invalid()).toBe(true);
  });

  it('should hydrate once from the store without autosaving or overwriting edits', async () => {
    fixture.destroy();
    createComponent({ ...validForm, autosave: true });

    expect(await (await getInput('username')).getValue()).toBe(
      validForm.username
    );
    expect(component.form().value()).toEqual({ ...validForm, autosave: true });
    expect(dispatchSpy).not.toHaveBeenCalled();

    await (await getInput('username')).setValue('local edit');
    expect(dispatchSpy).toHaveBeenCalledTimes(2);

    store.overrideSelector(selectFormState, { form: validForm });
    store.refreshState();
    fixture.detectChanges();

    expect(component.form.username().value()).toBe('local edit');
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should autosave changes only while enabled and disable manual save', async () => {
    const username = await getInput('username');
    const toggle = await loader.getHarness(MatSlideToggleHarness);
    const saveButton = await getSaveButton();

    await username.setValue('before autosave');
    expect(dispatchSpy).not.toHaveBeenCalled();

    await toggle.check();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenLastCalledWith(
      actionFormUpdate({
        form: { ...emptyForm, username: 'before autosave', autosave: true }
      })
    );
    expect(await saveButton.isDisabled()).toBe(true);

    await username.setValue('autosaved');
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenLastCalledWith(
      actionFormUpdate({
        form: { ...emptyForm, username: 'autosaved', autosave: true }
      })
    );

    await toggle.uncheck();
    await username.setValue('manual edit');
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(await saveButton.isDisabled()).toBe(false);
  });

  it('should reset an autosaving form without dispatching an update', async () => {
    await (await loader.getHarness(MatSlideToggleHarness)).check();
    await (await getInput('username')).setValue('autosaved');
    await (await getInput('username')).blur();
    dispatchSpy.mockClear();

    await (await getResetButton()).click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(actionFormReset());
    expect(component.form().value()).toEqual(emptyForm);
    expect(component.form().dirty()).toBe(false);
    expect(component.form().touched()).toBe(false);
    expect(await (await getSaveButton()).isDisabled()).toBe(false);
  });

  it('should keep Material checkbox, slider and datepicker values in the model', async () => {
    await (await loader.getHarness(MatCheckboxHarness)).check();
    const slider = await loader.getHarness(MatSliderHarness);
    await (await slider.getEndThumb()).setValue(7);
    const birthday = await loader.getHarness(MatDatepickerInputHarness);
    await birthday.setValue('1/2/2000');
    await birthday.blur();

    expect(component.form.requestGift().value()).toBe(true);
    expect(component.form.rating().value()).toBe(7);
    expect(component.form.birthday().value()).toEqual(new Date(2000, 0, 2));
  });

  it('should preserve required, email and description length validation', () => {
    for (const field of [
      component.form.username,
      component.form.password,
      component.form.email,
      component.form.description,
      component.form.birthday
    ]) {
      expect(field().errors()).toEqual(
        expect.arrayContaining([expect.objectContaining({ kind: 'required' })])
      );
    }
    component.form.email().value.set('not-an-email');
    expect(component.form.email().errors()).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: 'email' })])
    );
    component.form.description().value.set('short');
    expect(component.form.description().errors()).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: 'minLength' })])
    );
    component.form.description().value.set('x'.repeat(1001));
    expect(component.form.description().errors()).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: 'maxLength' })])
    );
    component.form().value.set(validForm);
    expect(component.form().valid()).toBe(true);
  });

  it('should show errors on invalid submit without saving or notifying', async () => {
    await loader
      .getHarness(MatButtonHarness.with({ text: 'anms.examples.form.send' }))
      .then((button) => button.click());

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(notificationSpy).not.toHaveBeenCalled();
    expect(component.form.username().touched()).toBe(true);
    const fields = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(await fields[0].getTextErrors()).toEqual([
      'anms.examples.form.placeholder1 anms.examples.form.error1'
    ]);
  });

  it.each([true, false])(
    'should submit valid data and notify with requestGift=%s',
    async (requestGift) => {
      component.form().value.set({ ...validForm, requestGift });
      await loader
        .getHarness(MatButtonHarness.with({ text: 'anms.examples.form.send' }))
        .then((button) => button.click());

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        actionFormUpdate({ form: { ...validForm, requestGift } })
      );
      expect(notificationSpy).toHaveBeenCalledWith(
        `anms.examples.form.${requestGift ? 'text4' : 'text5'} : anms.examples.form.text6`
      );
    }
  );
});
