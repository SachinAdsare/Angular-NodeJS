import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_services';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private jwtHelper : JwtHelperService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
          console.log(user);
          var data=this.jwtHelper.decodeToken(user["accessToken"]);
          if(data.role=="Admin" && state.url=='/'){
            return true;
          }

          this.router.navigate(['/posts'], { queryParams: { returnUrl: state.url }});
            return false;
        }

         this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
