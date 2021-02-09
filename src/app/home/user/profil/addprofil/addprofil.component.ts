import { Component, OnInit } from '@angular/core';
import {Profil} from '../../../../models/profil';
import {ProfilService} from '../../../../services/profil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addprofil',
  templateUrl: './addprofil.component.html',
  styleUrls: ['./addprofil.component.css']
})
export class AddprofilComponent implements OnInit {
  constructor(private profilservice: ProfilService) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Submit your profile libelle',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        const profil = new Profil(result.value);
        this.profilservice.addProfil(profil).subscribe();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profil has been saved',
          showConfirmButton: false,
          timer: 1500
        });
        /*Swal.fire({
          title: 'Poof! Your profil has been added!',
          icon: 'success',
        });*/
      }
    });
    }
}
