import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared/shared.module';

import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExamplesComponent } from './examples.component';

describe('ExamplesComponent', () => {
  let component: ExamplesComponent;
  let fixture: ComponentFixture<ExamplesComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesComponent],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              isAuthenticated: false
            }
          }
        }),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
