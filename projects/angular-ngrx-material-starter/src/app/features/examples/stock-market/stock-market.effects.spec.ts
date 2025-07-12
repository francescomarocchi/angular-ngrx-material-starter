import { Actions } from '@ngrx/effects';
import { EMPTY, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import {
  actionStockMarketRetrieve,
  actionStockMarketRetrieveError,
  actionStockMarketRetrieveSuccess
} from './stock-market.actions';
import { StockMarketEffects, STOCK_MARKET_KEY } from './stock-market.effects';
import { Stock } from './stock-market.model';
import { StockMarketService } from './stock-market.service';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideZonelessChangeDetection } from '@angular/core';

const symbol = 'TSLA';

describe('StockMarketEffects', () => {
  let localStorage: jest.Mocked<LocalStorageService>;
  let stockMarket: jest.Mocked<StockMarketService>;
  let scheduler: TestScheduler;
  let effects: StockMarketEffects;

  beforeEach(() => {
    localStorage = {
      setItem: jest.fn()
    } as unknown as jest.Mocked<LocalStorageService>;
    stockMarket = {
      retrieveStock: jest.fn()
    } as unknown as jest.Mocked<StockMarketService>;
    scheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        StockMarketEffects,
        { provide: LocalStorageService, useValue: localStorage },
        { provide: StockMarketService, useValue: stockMarket },
        provideMockActions(() => EMPTY)
      ]
    });
  });

  it('should emit ActionStockMarketRetrieveSuccess on success', (done) => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable } = helpers;
      const retrieveAction1 = actionStockMarketRetrieve({
        symbol
      });
      const retrieveAction2 = actionStockMarketRetrieve({
        symbol
      });
      const retrieveAction3 = actionStockMarketRetrieve({
        symbol
      });
      const stock: Stock = {
        symbol,
        exchange: 'exchange',
        last: '42',
        ccy: 'USD',
        change: 'change',
        changePositive: true,
        changeNegative: false,
        changePercent: '2.00'
      };
      const successAction = actionStockMarketRetrieveSuccess({
        stock
      });
      const values = {
        a: retrieveAction1,
        b: retrieveAction2,
        c: retrieveAction3,
        s: successAction
      };
      const source = cold('a--b--c', values);
      const expected = '--s--s--s';
      const actions = new Actions(source);

      stockMarket.retrieveStock.mockReturnValue(of(stock));

      TestBed.overrideProvider(Actions, { useValue: actions });

      effects = TestBed.inject(StockMarketEffects);

      expectObservable(effects.retrieveStock({ debounce: 2 })).toBe(
        expected,
        values
      );

      setTimeout(() => {
        expect(localStorage.setItem).toHaveBeenCalledTimes(3);
        expect(localStorage.setItem).toHaveBeenCalledWith(STOCK_MARKET_KEY, {
          symbol
        });
        done();
      });
    });
  });

  it('should emit ActionStockMarketRetrieveError on error', () => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable } = helpers;
      const retrieveAction = actionStockMarketRetrieve({
        symbol
      });
      const error = 'ERROR';
      const errorAction = actionStockMarketRetrieveError({
        error
      } as any);
      const values = {
        a: retrieveAction,
        e: errorAction
      };
      const source = cold('--a', values);
      const expected = '--e';
      const actions = new Actions(source);

      stockMarket.retrieveStock.mockReturnValue(throwError(error));

      TestBed.overrideProvider(Actions, { useValue: actions });

      effects = TestBed.inject(StockMarketEffects);

      expectObservable(effects.retrieveStock({ debounce: 0 })).toBe(
        expected,
        values
      );
    });
  });
});
