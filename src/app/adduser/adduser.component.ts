import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Profil} from '../models/profil';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ProfilService} from '../services/profil.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  submitted = false;
  addForm: FormGroup;
  nom: string; prenom: string; login: string;
  password: string; adresse: string;
  genre: string; telephone: string;
  profil: Profil; email: string; avatar: any;
  message: string;
  allprofil: Profil[];
  url: any;
  constructor(private formBuilder: FormBuilder,
              private userservice: UserService,
              private profilservice: ProfilService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      genre: new FormControl(),
      profil: new FormControl(),
      avatar: new FormControl()
    });
    this.profilservice.getprofils().subscribe(
      res => {
        this.allprofil = res;
      },
      error => {
        console.log('error');
      }
    );
  }
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    const paragraphe = document.getElementById('message');
    paragraphe.style.display = 'block';
    const {nom, login, password, prenom, adresse, telephone, email, genre, profil, avatar} = this.addForm.value;
    const user = new FormData();
    user.append('nom', nom);
    user.append('login', login);
    user.append('password', password);
    user.append('prenom', prenom);
    user.append('adresse', adresse);
    user.append('telephone', telephone);
    user.append('email', email);
    user.append('genre', genre);
    user.append('profil', profil);
    user.append('avatar', this.avatar);
    this.userservice.addUser(user).subscribe(
      res => {
        //console.log(res);
        this.message = 'ok';
      }
      );
  }
  // tslint:disable-next-line:typedef
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      // tslint:disable-next-line:prefer-const
      //let reader = new FileReader();
      //reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      /*reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };*/
      // @ts-ignore
      this.avatar = event.target.files[0];
    }
  }

}
