import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertsService } from 'angular-alert-module';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'add.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
       private alertService: AlertsService
    ) {}

    ngOnInit() {



        this.form = this.formBuilder.group({
            postTitle: ['', Validators.required],
        });


    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;


        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

            this.createPost();

    }

    private createPost() {
        this.accountService.addPost(this.form.value)
            .subscribe({
                next: () => {
                    this.alertService.setMessage('Post added successfully',"success");
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.setMessage(error,"error");
                    this.loading = false;
                }
            });
    }




}
