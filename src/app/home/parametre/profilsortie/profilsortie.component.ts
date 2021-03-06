import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ProfilSortie} from '../../../models/ProfilSortie';
import {ProfilsortieService} from '../../../services/profilsortie.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import Swal from 'sweetalert2';
import {Profil} from '../../../models/profil';

@Component({
  selector: 'app-profilsortie',
  templateUrl: './profilsortie.component.html',
  styleUrls: ['./profilsortie.component.css']
})
export class ProfilsortieComponent implements OnInit {
  colonne: string[] = ['libelle', 'delete'];
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  inputmodifie: string;
  profilsortie: ProfilSortie[];
  constructor(private profilsortieservice: ProfilsortieService) { }

  // tslint:disable-next-line:typedef
  public getServerData(event?: PageEvent){
    this.profilsortieservice.getAll(event.pageIndex).subscribe(
      res => {
        this.profilsortie = res;
      },
      error => {
        Swal.fire({
          title: 'Error recuperation!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
      }
    );
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return event;
  }
  ngOnInit(): void {
    this.profilsortieservice.getAll(0)
      .subscribe(
        res => {
          this.profilsortie = res;
        },
        error => {
          Swal.fire({
            title: 'Error recuperation!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Yes'
          });
        }
      );
  }
// tslint:disable-next-line:typedef
delete(ps: ProfilSortie){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-3',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.profilsortieservice.deleteOneProfilsortie(ps.id).subscribe();
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
      this.refresh();
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      );
    }
  });
  }
  // tslint:disable-next-line:typedef
update(ps: ProfilSortie){
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Save`,
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.inputmodifie = document.getElementById('td' + ps.id).textContent;
      // tslint:disable-next-line:triple-equals
      if (this.inputmodifie != ''){
        const prof = new Profil(this.inputmodifie);
        console.log(prof);
        this.profilsortieservice.updateOneProfilsortie(ps.id, prof).subscribe();
        Swal.fire('Saved!', '', 'success');
      }
      else{
        Swal.fire({
          title: 'the field must not be empty',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
      }
      this.refresh();
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  });
  }
  // tslint:disable-next-line:typedef
  refresh(){
    this.profilsortieservice.getAll(0)
      .subscribe(
        res => {
          this.profilsortie = res;
        },
        error => {
          Swal.fire({
          title: 'Error recuperation!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Yes'
        });
        }
      );
  }
}
