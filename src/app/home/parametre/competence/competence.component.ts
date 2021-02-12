import { Component, OnInit } from '@angular/core';
import {GroupecompetenceService} from '../../../services/groupecompetence.service';
import {Groupecompetence} from '../../../models/groupecompetence';
import {Competence} from '../../../models/competence';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import {CompetenceService} from '../../../services/competence.service';
import {Niveau} from '../../../models/niveau';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {
  grpcompetences: Groupecompetence[];
  competences: Competence[];
  text: string;
  idgc: number;
  niveaux: Niveau[];
  p = 1;
  toppingsControl = new FormControl([]);
  constructor(private grpcompetenceservice: GroupecompetenceService,
              private competenceservice: CompetenceService) { }

  ngOnInit(): void {
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
        console.log(this.grpcompetences);
      }
    );
  }
  // tslint:disable-next-line:typedef
  getgroupe(){
    this.idgc = this.toppingsControl.value;
    this.grpcompetenceservice.getcompetenceforGrpcompetence(this.idgc).subscribe(
      res => {
        this.competences = res['competence'];
      }
    );
  }
  // tslint:disable-next-line:typedef
  openNiveau(item: Competence){
    this.competenceservice.getcompetencebyId(item.id).subscribe(
      res => {
        this.niveaux = res.niveau;
        this.text = res.libelle;
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  deleteComp(c: Competence){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
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
        this.competenceservice.deleteOneCompetence(c.id).subscribe();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
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

}
