import { Component, OnInit } from '@angular/core';
import {CompetenceService} from '../../../../services/competence.service';
import {Competence} from '../../../../models/competence';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';

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
  ngOnInit(): void {
    this.competenceservice.getAllcompetence().subscribe(
      res => {
        //console.log(res);
        this.competences = res;
      },
      error => {
        console.log(error);
      }
    );
    this.addForm = this.fb.group({
      libelle: '',
      description: '',
      competence: new FormControl([])
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
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
