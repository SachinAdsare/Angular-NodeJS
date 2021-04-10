import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService,  } from '@app/_services';
import { AlertsService } from 'angular-alert-module';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
  users: any;
  viewList=true;
  userData: any;

    constructor(private accountService: AccountService,private alertService: AlertsService) {
        this.user = this.accountService.userValue;
    }
    ngOnInit() {
     this.getAllPost();
  }

  getAllPost(){
    this.accountService.getAll()
    .subscribe(users => {this.users = users["rows"],
    console.log("users",this.users)});

  }

  view(id){
    this.viewList=false;
    this.users.map(element=>{
      if(element.id==id){
        this.userData=element;
      }
    })
  }

  async delete(id: number,userId:number) {

    this.accountService
      .delete(id)
      .subscribe((posts) => {
        this.alertService.setMessage('Post deleted successfully',"success")
      });
     await this.getAllPost();
     await this.view(userId);

  }

}
