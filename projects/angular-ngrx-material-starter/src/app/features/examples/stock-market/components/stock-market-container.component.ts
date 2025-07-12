import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { selectStockMarket } from '../stock-market.selectors';
import { actionStockMarketRetrieve } from '../stock-market.actions';
import { StockMarketState } from '../stock-market.model';
import { State } from '../../examples.state';

@Component({
  selector: 'anms-stock-market',
  templateUrl: './stock-market-container.component.html',
  styleUrls: ['./stock-market-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class StockMarketContainerComponent implements OnInit {
  store = inject<Store<State>>(Store);

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  stocks$: Observable<StockMarketState> | undefined;

  ngOnInit() {
    this.stocks$ = this.store.pipe(select(selectStockMarket));
    this.stocks$
      .pipe(take(1))
      .subscribe((stocks) => this.onSymbolValue(stocks.symbol));
  }

  onSymbolValue(symbol: string) {
    this.store.dispatch(actionStockMarketRetrieve({ symbol }));
  }

  onSymbolChange(event: any) {
    this.onSymbolValue(event.target.value);
  }
}
