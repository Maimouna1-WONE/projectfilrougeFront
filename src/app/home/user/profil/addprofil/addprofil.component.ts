import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profil} from '../../../../models/profil';
import {ProfilService} from '../../../../services/profil.service';
import {User} from '../../../../models/user';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-addprofil',
  templateUrl: './addprofil.component.html',
  styleUrls: ['./addprofil.component.css']
})
export class AddprofilComponent implements OnInit {
submitted = false;
addForm: FormGroup;
libelle: string;
message: string;
  constructor(private formBuilder: FormBuilder, private profilservice: ProfilService, private flashmessage: FlashMessagesService) { }

  ngOnInit(): void {
      this.addForm = this.formBuilder.group({
        libelle: ['', Validators.required]
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
    if (this.addForm.invalid){
      return;
    }
    // tslint:disable-next-line:label-position
    const data = this.addForm.value;
    // @ts-ignore
    const paragraphe = document.getElementById('message');
    paragraphe.style.display = 'block';
    this.profilservice.addProfil(data).subscribe(
      res => {
        // @ts-ignore
        this.flashmessage.show('Ajout reussi', {cssClass: 'alert-success', timeout: 1000});
      },
      error => {
        this.flashmessage.show('Echec', {cssClass: 'alert-danger', timeout: 1000});
      }
    );
  }
}
