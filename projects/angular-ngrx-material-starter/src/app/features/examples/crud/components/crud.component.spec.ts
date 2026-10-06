import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { SharedModule } from '../../../../shared/shared.module';

import { provideZonelessChangeDetection } from '@angular/core';
import { selectAllBooks, selectSelectedBook } from '../books.selectors';
import { CrudComponent } from './crud.component';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule,
        CrudComponent
      ],
      providers: [
        provideMockStore(),
        provideZonelessChangeDetection(),
        provideTranslateService()
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllBooks, []);
    store.overrideSelector(selectSelectedBook, undefined);
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
