import { expect } from 'vitest';
import { NavigationEnd, Router } from '@angular/router';
import { getEffectsMetadata } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';

import { GoogleAnalyticsEffects } from './google-analytics.effects';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AuthEffects } from '../auth/auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';

const scheduler = new TestScheduler((actual, expected) =>
  expect(actual).toEqual(expected)
);

describe('GoogleAnalyticsEffects', () => {
  let router: any;
  let effect: GoogleAnalyticsEffects;
  const ga = (<any>window).ga;

  beforeEach(() => {
    router = {
      routerState: {
        snapshot: {}
      },
      events: {
        pipe: jest.fn()
      }
    };

    TestBed.configureTestingModule({
      providers: [
        GoogleAnalyticsEffects,
        provideZonelessChangeDetection(),
        { provide: Router, useValue: router }
      ]
    });

    effect = TestBed.inject(GoogleAnalyticsEffects);

    (<any>window).ga = jest.fn();
  });

  afterAll(() => {
    (<any>window).ga = ga;
  });

  it('should not dispatch action', () => {
    const metadata = getEffectsMetadata(effect);

    expect(metadata.pageView?.dispatch).toEqual(false);
  });

  it('should call google analytics', () => {
    scheduler.run((helpers) => {
      const { cold } = helpers;

      const routerEvent = new NavigationEnd(1, '', '');
      router.events = cold('a', { a: routerEvent });

      effect.pageView().subscribe(() => {
        expect((<any>window).ga).not.toHaveBeenCalled();
        expect((<any>window).ga).not.toHaveBeenCalledWith(
          'set',
          'page',
          routerEvent.urlAfterRedirects
        );
        expect((<any>window).ga).not.toHaveBeenCalledWith('send', 'pageview');
      });
    });
  });
});
