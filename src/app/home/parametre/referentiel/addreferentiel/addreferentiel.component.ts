import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetenceService} from '../../../../services/competence.service';
import {Competence} from '../../../../models/competence';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {ReferentielService} from '../../../../services/referentiel.service';
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
  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(private grpcompetenceservice: GroupecompetenceService,
              private formbuilder: FormBuilder,
              private referentielservice: ReferentielService) { }
  ngOnInit(): void {
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
      },
      error => {
        console.log(error);
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
    this.toppingsControl.setValue(toppings); // To trigger change detection
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
    //console.log(this.addForm.value);
    //console.log(this.toppingsControl.value);
    const {libelle, presentation, critereevaluation, critereadmission} = this.addForm.value;
    const refer = new FormData();
    refer.append('libelle', libelle);
    refer.append('presentation', presentation);
    refer.append('critereEvaluation', critereevaluation);
    refer.append('critereAdmission', critereadmission);
    refer.append('groupeCompetence', this.toppingsControl.value);
    refer.append('programme', this.programme);

    //console.log(refer);
    this.referentielservice.addReferentiel(refer).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
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
