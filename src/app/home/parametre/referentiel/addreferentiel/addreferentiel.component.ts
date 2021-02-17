import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {ReferentielService} from '../../../../services/referentiel.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addreferentiel',
  templateUrl: './addreferentiel.component.html',
  styleUrls: ['./addreferentiel.component.css']
})
export class AddreferentielComponent implements OnInit {
grpcompetences: Groupecompetence[];
addForm: FormGroup;
grpcompetence: [];
programme: any;
  submitted = false;
  toppingsControl = new FormControl([]);
  constructor(private grpcompetenceservice: GroupecompetenceService,
              private formbuilder: FormBuilder,
              private referentielservice: ReferentielService) { }
  ngOnInit(): void {
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
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
    this.addForm = this.formbuilder.group({
      libelle: ['', Validators.required],
      presentation: ['', Validators.required],
      grpcompetence: ['', Validators.required],
      programme: [''],
      critereevaluation: ['', Validators.required],
      critereadmission: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  onToppingRemoved(topping: string) {
    const toppings = this.toppingsControl.value as string[];
    this.removeFirst(toppings, topping);
    this.toppingsControl.setValue(toppings);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  // tslint:disable-next-line:typedef
  OnSubmit(){
    this.submitted = true;
    const {libelle, presentation, critereevaluation, critereadmission} = this.addForm.value;
    const refer = new FormData();
    refer.append('libelle', libelle);
    refer.append('presentation', presentation);
    refer.append('critereEvaluation', critereevaluation);
    refer.append('critereAdmission', critereadmission);
    refer.append('groupeCompetence', this.toppingsControl.value);
    refer.append('programme', this.programme);

    this.referentielservice.addReferentiel(refer).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Referentiel has been saved',
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
      this.programme = event.target.files[0];
    }
  }
}
