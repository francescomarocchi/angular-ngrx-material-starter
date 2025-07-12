import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared.module';

@Component({
  selector: 'anms-host-for-test',
  template: '',
  imports: [SharedModule],
  standalone: true
})
class HostComponent {
  actionHandler = () => {};
}

describe('BigInputActionComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  const getButton = () => fixture.debugElement.query(By.css('button'));
  const getIcon = () => fixture.debugElement.query(By.css('mat-icon'));
  const getLabel = () =>
    fixture.debugElement.query(By.css('.mdc-button__label > span'));

  function createHostComponent(
    template: string
  ): ComponentFixture<HostComponent> {
    TestBed.overrideComponent(HostComponent, { set: { template: template } });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()]
    })
  );

  it('should be created', () => {
    const template = '<anms-big-input-action></anms-big-input-action>';
    fixture = createHostComponent(template);
    expect(component).toBeTruthy();
  });

  it('should initially not be disabled and show no icon or label', () => {
    const template = '<anms-big-input-action></anms-big-input-action>';
    fixture = createHostComponent(template);
    expect(getButton().nativeElement.disabled).toBeFalsy();
    expect(getIcon()).toBeNull();
    expect(getLabel()).toBeNull();
  });

  it('should disable button if disabled property is set', () => {
    const template =
      '<anms-big-input-action [disabled]="true"></anms-big-input-action>';
    fixture = createHostComponent(template);
    expect(getButton().nativeElement.disabled).toBeTruthy();
  });

  it('should display icon if fontSet and fontIcon properties are set', () => {
    const template =
      '<anms-big-input-action fontSet="fas" fontIcon="trash"></anms-big-input-action>';
    fixture = createHostComponent(template);
    expect(getIcon()).toBeTruthy();
    expect(getIcon().nativeElement.classList.contains('trash')).toBeTruthy();
    expect(getIcon().nativeElement.classList.contains('fas')).toBeTruthy();
  });

  it('should display label with provided text when label property is set', () => {
    const template =
      '<anms-big-input-action label="delete"></anms-big-input-action>';
    fixture = createHostComponent(template);
    expect(getLabel()).toBeTruthy();
    expect(getLabel().nativeElement.textContent).toBe('delete');
  });

  it('should emit action event on button click', () => {
    const template =
      '<anms-big-input-action (action)="actionHandler()"></anms-big-input-action>';
    fixture = createHostComponent(template);
    jest.spyOn(component, 'actionHandler').mockImplementation();
    getButton().triggerEventHandler('click', {});
    expect(component.actionHandler).toHaveBeenCalled();
  });
});
