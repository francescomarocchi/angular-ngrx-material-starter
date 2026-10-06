import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { SharedModule } from '../../../shared/shared.module';

import { provideZonelessChangeDetection } from '@angular/core';
import {
  actionSettingsChangeAnimationsElements,
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeStickyHeader,
  actionSettingsChangeTheme
} from '../../../core/settings/settings.actions';
import { SettingsState } from '../../../core/settings/settings.model';
import { selectSettings } from '../../../core/settings/settings.selectors';
import { SettingsContainerComponent } from './settings-container.component';
import SpyInstance = jest.SpyInstance;

describe('SettingsComponent', () => {
  let component: SettingsContainerComponent;
  let fixture: ComponentFixture<SettingsContainerComponent>;
  let store: MockStore;
  let dispatchSpy: SpyInstance;
  let mockSelectSettings: MemoizedSelector<{}, SettingsState>;

  const getThemeSelectArrow = () =>
    fixture.debugElement.queryAll(By.css('.mat-mdc-select-trigger'))[1];
  const getSelectOptions = () =>
    fixture.debugElement.queryAll(By.css('mat-option'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        SharedModule,
        NoopAnimationsModule,
        SettingsContainerComponent
      ],
      providers: [
        provideMockStore(),
        provideZonelessChangeDetection(),
        provideTranslateService()
      ]
    }).compileComponents();

    TestBed.inject(FaIconLibrary).addIcons(faBars);

    store = TestBed.inject(MockStore);
    mockSelectSettings = store.overrideSelector(
      selectSettings,
      {} as SettingsState
    );
    fixture = TestBed.createComponent(SettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch change sticky header on sticky header toggle', () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[0];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeStickyHeader({ stickyHeader: false })
    );
  });

  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    getThemeSelectArrow().triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeTheme({ theme: 'LIGHT-THEME' })
    );
  });

  it('should dispatch change auto night mode on night mode toggle', () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[1];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeAutoNightMode({ autoNightMode: false })
    );
  });

  it('should dispatch change animations page', () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[2];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeAnimationsPage({ pageAnimations: false })
    );
  });

  it('should dispatch change animations elements', () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[3];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeAnimationsElements({ elementsAnimations: false })
    );
  });

  it('should disable change animations page when disabled is set in state', () => {
    mockSelectSettings.setResult({
      pageAnimationsDisabled: true
    } as SettingsState);
    store.refreshState();
    fixture.detectChanges();

    dispatchSpy = jest.spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[2];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
