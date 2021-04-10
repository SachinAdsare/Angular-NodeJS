import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertsService } from 'angular-alert-module';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  posts = null;
  count = 0;
  constructor(
    private accountService: AccountService,
    private alerts: AlertsService
  ) {}

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.accountService.getAllPostByUser().subscribe((posts) => {
      this.count = posts['count'];
      this.posts = posts['rows'];
      console.log(this.posts);
    });
  }

  delete(id: number) {
    this.accountService.delete(id).subscribe((posts) => {
      this.getAllPost();

      this.alerts.setMessage('Post deleted successfully', 'success');

    });
  }
}
