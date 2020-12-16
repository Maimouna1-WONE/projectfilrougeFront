import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit
{
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  dtee: User;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService )
  {
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.loginForm.controls;
  }
  // tslint:disable-next-line:typedef
  onSubmit()
  {
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.authenticationService.login(this.f.login.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data === 'ROLE_ADMIN')
          {
            this.returnUrl = 'home';
          }
          else if (data === 'ROLE_FORMATEUR')
          {
            this.returnUrl = 'formateur';
          }
          else if (data === 'ROLE_APPRENANT')
          {
            this.returnUrl = 'apprenant';
          }
          else if (data === 'ROLE_CM')
          {
            this.returnUrl = 'cm';
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        }
      );
  }
}
