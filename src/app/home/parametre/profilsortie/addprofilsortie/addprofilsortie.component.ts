import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import {ProfilsortieService} from '../../../../services/profilsortie.service';
import {ProfilSortie} from '../../../../models/ProfilSortie';
import Swal from 'sweetalert2';
import {Profil} from '../../../../models/profil';

@Component({
  selector: 'app-addprofilsortie',
  templateUrl: './addprofilsortie.component.html',
  styleUrls: ['./addprofilsortie.component.css']
})
export class AddprofilsortieComponent implements OnInit {
  constructor(private profilsortieservice: ProfilsortieService) { }
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
        this.profilsortieservice.addProfilsortie(profil).subscribe();
        /*Swal.fire({
          title: 'Poof! Your profil has been added!',
          icon: 'success',
        });*/
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profil de Sortie has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
