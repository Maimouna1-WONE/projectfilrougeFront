import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetenceService} from '../../../../services/competence.service';

@Component({
  selector: 'app-addcompetence',
  templateUrl: './addcompetence.component.html',
  styleUrls: ['./addcompetence.component.css']
})
export class AddcompetenceComponent implements OnInit {
addForm: FormGroup;
submitted = false;
  constructor(private fb: FormBuilder,
              private competenceservice: CompetenceService) {
    this.addForm = this.fb.group({
      libelle: '',
      description: '',
      niveau: this.fb.array([])
    });
  }
// tslint:disable-next-line:typedef
  ngOnInit() {
  }
  // tslint:disable-next-line:typedef
  /*addCompetence() {
    this.competence().push(this.newCompetence());
  }*/
  // tslint:disable-next-line:typedef
  /*removeCompetence(empIndex: number) {
    this.competence().removeAt(empIndex);
  }*/
  CompetenceNiveaux(): FormArray {
    return this.addForm.get('niveau') as FormArray;
  }
  newNiveau(): FormGroup {
    return this.fb.group({
      libelle: '',
      action: '',
      critereEvaluation: '',
    });
  }
  // tslint:disable-next-line:typedef
  addCompetenceNiveau() {
    // @ts-ignore
    return (this.addForm.get('niveau') as FormArray).push(this.newNiveau());
  }
  // tslint:disable-next-line:typedef
  /*removeCompetenceNiveau(empIndex: number, skillIndex: number) {
    this.CompetenceNiveaux(empIndex).removeAt(skillIndex);
  }*/
  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.addForm.value);
    this.competenceservice.addCompetence(this.addForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
