import { Form } from '../form.model';

export const EMPTY_FORM: Form = {
  autosave: false,
  username: '',
  password: '',
  email: '',
  description: '',
  requestGift: false,
  birthday: new Date(),
  rating: 0
};

export const TRANSLATION_KEYS = {
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
