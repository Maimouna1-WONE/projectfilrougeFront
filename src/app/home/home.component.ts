import { Component, OnInit} from '@angular/core';
import {AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {ProfilService} from '../services/profil.service';
import {User} from '../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private userservice: UserService,
    private profilservice: ProfilService,
    private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  users = [] ;
  user: User =
    {
      prenom: '',
      nom: '',
      login: '',
      adresse: '',
      genre: '',
      telephone: '',
      email: ''
    };
  cour: User;
  currentUser: User;
  info: any;
  hide = true;
  // tslint:disable-next-line:typedef
  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/login_check']);
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
  }
}

