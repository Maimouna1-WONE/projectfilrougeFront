import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Competence} from '../../../../models/competence';
import {ActivatedRoute, Data} from '@angular/router';
import {CompetenceService} from '../../../../services/competence.service';

@Component({
  selector: 'app-updatecompetence',
  templateUrl: './updatecompetence.component.html',
  styleUrls: ['./updatecompetence.component.css']
})
export class UpdatecompetenceComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  cour: Competence;
  nb = 0;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private competenceservice: CompetenceService) {
    this.addForm = this.fb.group({
      libelle: '',
      description: '',
      niveau: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.cour = data.competenceupdate;
      }
    );
    this.addForm.patchValue(
      {
        libelle: this.cour.libelle,
        description: this.cour.description,
      }
    );
  }
  // tslint:disable-next-line:typedef
  patchComp(){
    this.addForm.patchValue(
      {
        libelle: this.cour.libelle,
        description: this.cour.description,
      }
    );
  }
  // tslint:disable-next-line:typedef
  patchNiveauxValues(i: number){
      (this.addForm.get('niveau') as FormArray).controls[i].patchValue(
          {
            libelle: this.cour.niveau[i].libelle,
            action: this.cour.niveau[i].action,
            critereEvaluation: this.cour.niveau[i].critereEvaluation
          }
        );
  }
  // tslint:disable-next-line:typedef
  resetNiveauxValues(i: number) {
    (this.addForm.get('niveau') as FormArray).controls[i].reset();
  }
  // tslint:disable-next-line:typedef
  reset() {
    this.addForm.reset();
  }
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
  nbclick(){
    this.nb = this.nb + 1;
    if (this.nb === 3){
      const id = document.getElementById('add');
      id.setAttribute('disabled', 'true');
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    console.log(this.addForm.value);
    this.competenceservice.UpdateCompetence(this.cour.id, this.addForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
