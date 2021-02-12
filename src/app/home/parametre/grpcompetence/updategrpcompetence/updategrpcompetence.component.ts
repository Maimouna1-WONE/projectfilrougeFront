import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Competence} from '../../../../models/competence';
import Swal from 'sweetalert2';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {CompetenceService} from '../../../../services/competence.service';

@Component({
  selector: 'app-updategrpcompetence',
  templateUrl: './updategrpcompetence.component.html',
  styleUrls: ['./updategrpcompetence.component.css']
})
export class UpdategrpcompetenceComponent implements OnInit {
cour: Groupecompetence;
  addForm: FormGroup;
  submitted = false;
  comp: Competence[];
  selectedItems = [];
  dropdownSettings: any;
  constructor(private route: ActivatedRoute,
              private formbuilder: FormBuilder,
              private grpcompetenceservice: GroupecompetenceService,
              private competenceservice: CompetenceService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select competences',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      primaryKey: 'id',
      labelKey: 'libelle'
    };
    this.route.data.subscribe(
      (data: Data) => {
        this.cour = data.grpCompetence;
      }
    );
    this.competenceservice.getAllcompetence().subscribe(
      res => {
        this.comp = res;
      },
      error => {
        console.log(error);
      }
    );
    this.addForm = this.formbuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      competence: ['', Validators.required]
    });
    this.addForm = this.formbuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      competence: ['', Validators.required],
    });
    this.addForm.patchValue(
      {
        libelle: this.cour.libelle,
        description: this.cour.description
      }
    );
    // @ts-ignore
    for (const c of this.cour.competence){
      this.selectedItems.push(c);
    }
    console.log(this.selectedItems);
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
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  OnSubmit(){
    this.submitted = true;
    const {libelle, description} = this.addForm.value;
    const grp = new FormData();
    grp.append('libelle', libelle);
    grp.append('description', description);
    for (const g of this.addForm.value.competence){
      grp.append('competence[]', g.id);
    }
    this.grpcompetenceservice.updateOneGrpcompetence(this.cour.id, grp).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Groupe Competence has been saved',
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
