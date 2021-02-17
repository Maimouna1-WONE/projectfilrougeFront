import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data} from '@angular/router';
import {User} from '../../models/user';
import * as CryptoJS from 'crypto-js';
import {AuthenticationService} from '../../authentication/authentication.service';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  submitted = false;
  addForm: FormGroup;
  hide = true;
  hide1 = true;
  cour: User;
  pwd: string;
  cpwd: string;
  ok = false;
  // tslint:disable-next-line:variable-name
  error_messages = {
    password: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    confirmerpassword: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  };
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private userservice: UserService,
              private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.cour = data.updatepassword;
        console.log(this.cour);
      }
    );
    this.addForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmerpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]))
    },
      {
        validators: this.password.bind(this)
      });
  }
  // tslint:disable-next-line:typedef
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmerpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
// tslint:disable-next-line:typedef
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    // tslint:disable-next-line:triple-equals
    if (this.addForm.errors === null){
      const user = new FormData();
      user.append('password', this.addForm.value.password);
      this.userservice.updateOneUser(this.cour.id, user).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Mot de passe modifié avec succes',
            showConfirmButton: false,
            timer: 1500
          });
          this.auth.logout();
        },
        error => {
          Swal.fire({
            title: 'Error !',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Yes'
          });
        }
      );
    }
  }
  // tslint:disable-next-line:typedef
  verifier(){
    //this.password = document.getElementById('password').textContent;
    //console.log(this.password);
    const pwd = localStorage.getItem('password');
    const pwd1 = pwd.substring(0, pwd.length - 1);
    const  pwd2 = pwd1.substring(1, pwd1.length);
    //if (pwd2 === atob(this.password)){}
    return (pwd2 === this.pwd);
  }
}
