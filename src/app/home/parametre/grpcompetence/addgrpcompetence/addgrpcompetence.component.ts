import { Component, OnInit } from '@angular/core';
import {CompetenceService} from '../../../../services/competence.service';
import {Competence} from '../../../../models/competence';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addgrpcompetence',
  templateUrl: './addgrpcompetence.component.html',
  styleUrls: ['./addgrpcompetence.component.css']
})
export class AddgrpcompetenceComponent implements OnInit {
competences: Competence[];
  addForm: FormGroup;
  submitted = false;
  constructor(private competenceservice: CompetenceService,
              private fb: FormBuilder, private grpcompetenceservice: GroupecompetenceService) { }
  toppingsControl = new FormControl([]);
  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

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
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.addForm.controls;
  }
  ngOnInit(): void {
    this.competenceservice.getAllcompetence().subscribe(
      res => {
        this.competences = res;
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
    this.addForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      competence: new FormControl([], Validators.required)
    });
  }
  // tslint:disable-next-line:typedef
  OnSubmit(){
    this.submitted = true;
    // @ts-ignore
    this.addForm.get('competence').setValue(this.toppingsControl.value);
    console.log(this.addForm.value);
    this.grpcompetenceservice.addGrpCompetence(this.addForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Groupe de Competence has been saved',
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
