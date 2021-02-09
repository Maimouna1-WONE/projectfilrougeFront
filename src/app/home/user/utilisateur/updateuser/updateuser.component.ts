import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Params} from '@angular/router';
import {User} from '../../../../models/user';
import {UserService} from '../../../../services/user.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  id: number;
  ok: any;
  img = false;
  submitted = false;
  addForm: FormGroup;
  nom: string; prenom: string; login: string;
  password: string; adresse: string;
  genre: string; telephone: string; email: string; avatar: any;
  user: User;
  cour: User;
  hide: boolean;
  url = '';
  constructor(private route: ActivatedRoute,
              private userservice: UserService,
              private formBuilder: FormBuilder,
              private flashmessage: FlashMessagesService)
  {
  }
  // @ts-ignore
  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.cour = data.user;
      }
    );
    this.addForm = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      avatar: new FormControl()
    });
    this.avatar = this.cour.avatar;
    this.addForm.patchValue(
      {
        login: this.cour.login,
        adresse: this.cour.adresse,
        nom: this.cour.nom,
        prenom: this.cour.prenom,
        email: this.cour.email,
        telephone: this.cour.telephone,
        genre: this.cour.genre,
        avatar: this.url
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
    const {nom, login, password, prenom, adresse, telephone, email, genre} = this.addForm.value;
    const user = new FormData();
    if (!this.avatar){
      this.avatar = this.cour.avatar;
    }
    user.append('nom', nom);
    user.append('login', login);
    user.append('password', password);
    user.append('prenom', prenom);
    user.append('adresse', adresse);
    user.append('telephone', telephone);
    user.append('email', email);
    user.append('genre', genre);
    user.append('avatar', this.avatar);
    this.userservice.updateOneUser(this.cour.id, user).subscribe(
        res => {
          this.flashmessage.show('Modification reussie', {cssClass: 'alert-success', timeout: 1000});
        },
        error => {
          this.flashmessage.show('echec', {cssClass: 'alert-danger', timeout: 1000});
        }
      );
  }
  // tslint:disable-next-line:typedef
// @ts-ignore
  // tslint:disable-next-line:typedef
  onSelectFile(event){
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
