import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Profil} from '../../../../models/profil';
import {UserService} from '../../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  submitted = false;
  addForm: FormGroup;
  hide = true;
  nom: string; prenom: string; login: string;
  adresse: string;
  genre: string; telephone: string;
  profil: Profil; email: string; avatar: any;
  message: string;
  url = '../../../../../assets/unnamed.png';
  constructor(private formBuilder: FormBuilder,
              private userservice: UserService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      login: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      genre: new FormControl(),
      profil: new FormControl(),
      avatar: new FormControl()
    });
  }
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    const {nom, login, prenom, adresse, telephone, email, genre, profil} = this.addForm.value;
    const user = new FormData();
    user.append('nom', nom);
    user.append('login', login);
    //user.append('password', password);
    user.append('prenom', prenom);
    user.append('adresse', adresse);
    user.append('telephone', telephone);
    user.append('email', email);
    user.append('genre', genre);
    user.append('profil', profil);
    user.append('avatar', this.avatar);
    this.userservice.addUser(user).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
      }
      );
  }
  // tslint:disable-next-line:typedef
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

}
