import { TodoFormComponent } from './todo-form.component';
import { FormBuilder } from '@angular/forms';

describe('TodoFormComponent', () => {
  var component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });

  it('should creat a form with 2 controls', () => {
    // Verificando se existe o form control 'name' e 'email'
    // toBe(true) ou toBeTruthy()
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should make the name control required', () => {
    let control = component.form.get('name');

    control.setValue('');

    // toBe(false) ou toBeFalsy()
    expect(control.valid).toBeFalsy();
  });
});
