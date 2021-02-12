import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data} from '@angular/router';
import {Referentiel} from '../../../../models/referentiel';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import {Groupecompetence} from '../../../../models/groupecompetence';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ReferentielService} from '../../../../services/referentiel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatereferentiel',
  templateUrl: './updatereferentiel.component.html',
  styleUrls: ['./updatereferentiel.component.css']
})
export class UpdatereferentielComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  grpcompetences: Groupecompetence[];
  programme: any;
  cour: Referentiel;
  selectedItems = [];
  dropdownSettings: any;
  constructor(private grpcompetenceservice: GroupecompetenceService,
              private formbuilder: FormBuilder,
              private route: ActivatedRoute,
              private flashmessage: FlashMessagesService,
              private referentielservice: ReferentielService) { }

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
    this.grpcompetenceservice.getAllgrpcompetence().subscribe(
      res => {
        this.grpcompetences = res;
      },
      error => {
        console.log(error);
      }
    );
    this.route.data.subscribe(
      (data: Data) => {
        this.cour = data.referentiel;
        console.log(this.cour);
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
    this.programme = this.cour.programme;
    this.addForm.patchValue(
      {
        libelle: this.cour.libelle,
        presentation: this.cour.presentation,
        critereevaluation: this.cour.critereEvaluation,
        critereadmission: this.cour.critereAdmission,
      }
    );
    // @ts-ignore
    for (const c of this.cour.groupeCompetence){
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
    const {libelle, presentation, critereevaluation, critereadmission} = this.addForm.value;
    const ref = new FormData();
    if (!this.programme){
      this.programme = this.cour.programme;
    }
    ref.append('libelle', libelle);
    ref.append('presentation', presentation);
    ref.append('critereevaluation', critereevaluation);
    ref.append('critereadmission', critereadmission);
    for (const g of this.addForm.value.grpcompetence){
      ref.append('groupeCompetence[]', g.id);
    }
    ref.append('programme', this.programme);
    this.referentielservice.updateOneReferentiel(this.cour.id, ref).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Profil has been saved',
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
