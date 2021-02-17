import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Competence} from '../../../../models/competence';
import {ActivatedRoute, Data} from '@angular/router';
import {CompetenceService} from '../../../../services/competence.service';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {Groupecompetence} from '../../../../models/groupecompetence';
import Swal from 'sweetalert2';

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
  tab: any[] = [];
  grpcompetences: Groupecompetence[];
  toppingsControl = new FormControl([]);
  selectedItems: any[] = [];
  dropdownSettings: any;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private competenceservice: CompetenceService,
              private grpcompetenceservice: GroupecompetenceService) {
    this.addForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      groupeCompetences: new FormControl([], Validators.required),
      niveau: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select groupes de competences',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      primaryKey: 'id',
      labelKey: 'libelle'
    };
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
    for (const c of this.cour.groupeCompetences){
      this.selectedItems.push(c);
    }
  }
  // tslint:disable-next-line:typedef
  onItemSelect(item: any){
    console.log(item);
    console.log(this.selectedItems);
  }
  // tslint:disable-next-line:typedef
  OnItemDeSelect(item: any){
    console.log(item);
    console.log(this.selectedItems);
  }
  // tslint:disable-next-line:typedef
  onSelectAll(items: any){
    console.log(items);
  }
  // tslint:disable-next-line:typedef
  onDeSelectAll(items: any){
    console.log(items);
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
  get f()
  {
    return this.addForm.controls;
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
    for (const g of this.addForm.value.groupeCompetences){
      this.tab.push(g.id);
    }
    this.addForm.value.groupeCompetences = this.tab;
    this.competenceservice.UpdateCompetence(this.cour.id, this.addForm.value).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Competence has been updated',
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
