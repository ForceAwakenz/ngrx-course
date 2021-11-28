import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AppState } from '../reducers';
import { selectAuthState, isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigateByUrl('/login');
                }
            })
        )
    }
}