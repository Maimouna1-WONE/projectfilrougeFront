import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetenceService} from '../../../../services/competence.service';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {Groupecompetence} from '../../../../models/groupecompetence';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcompetence',
  templateUrl: './addcompetence.component.html',
  styleUrls: ['./addcompetence.component.css']
})
export class AddcompetenceComponent implements OnInit {
addForm: FormGroup;
submitted = false;
nb = 0;
grpcompetences: Groupecompetence[];
  toppingsControl = new FormControl([]);
  constructor(private fb: FormBuilder,
              private competenceservice: CompetenceService,
              private grpcompetenceservice: GroupecompetenceService) {
    this.addForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      groupeCompetences: new FormControl([], Validators.required),
      niveau: this.fb.array([], Validators.required)
    });
  }
// tslint:disable-next-line:typedef
  ngOnInit() {
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
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
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  /*addCompetence() {
    this.competence().push(this.newCompetence());
  }*/
  // tslint:disable-next-line:typedef
  /*removeCompetence(empIndex: number) {
    this.competence().removeAt(empIndex);
  }*/
  // tslint:disable-next-line:typedef
  onToppingRemoved(topping: string) {
    const toppings = this.toppingsControl.value as string[];
    this.removeFirst(toppings, topping);
    this.toppingsControl.setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  CompetenceNiveaux(): FormArray {
    return this.addForm.get('niveau') as FormArray;
  }
  newNiveau(): FormGroup {
    return this.fb.group({
      libelle: ['', Validators.required],
      action: ['', Validators.required],
      critereEvaluation: ['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef
  addCompetenceNiveau() {
    // @ts-ignore
    return (this.addForm.get('niveau') as FormArray).push(this.newNiveau());
  }
  // tslint:disable-next-line:typedef
  nbclick(){
    this.nb = this.nb + 1;
    if (this.nb === 3){
      const id = document.getElementById('add');
      id.setAttribute('disabled', 'true');
    }
  }
  // tslint:disable-next-line:typedef
  /*removeCompetenceNiveau(empIndex: number, skillIndex: number) {
    this.CompetenceNiveaux(empIndex).removeAt(skillIndex);
  }*/
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    this.addForm.value.groupeCompetences = this.toppingsControl.value;
    console.log(this.addForm.value);
    this.competenceservice.addCompetence(this.addForm.value).subscribe(
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
}
