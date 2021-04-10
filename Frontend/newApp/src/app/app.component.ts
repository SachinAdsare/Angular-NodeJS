import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { of } from 'rxjs';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
  username:""
  role: any="";
    constructor(private accountService: AccountService) {

    }

    ngOnInit(): void {
      this.accountService.user.subscribe(x => {this.user = x;
        this.username=this.user?this.user["userData"]?.name:"";
        this.role=this.user?this.user["userData"].role:"";
        console.log(this.role);
      });

    }
    logout() {
        this.accountService.logout();
    }

}
