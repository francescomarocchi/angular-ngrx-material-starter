import { Injectable, inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private store = inject<Store<AppState>>(Store);

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticated));
  }
}
