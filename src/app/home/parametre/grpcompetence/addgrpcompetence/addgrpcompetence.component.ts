import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CompetenceService} from '../../../../services/competence.service';
import {Competence} from '../../../../models/competence';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupecompetenceService} from '../../../../services/groupecompetence.service';
import Swal from 'sweetalert2';
import {AddcompetenceComponent} from '../../competence/addcompetence/addcompetence.component';
import {RecupereService} from '../../../../services/recupere.service';

@Component({
  selector: 'app-addgrpcompetence',
  templateUrl: './addgrpcompetence.component.html',
  styleUrls: ['./addgrpcompetence.component.css']
})
export class AddgrpcompetenceComponent implements OnInit {
  constructor(private competenceservice: CompetenceService,
              private fb: FormBuilder,
              private grpcompetenceservice: GroupecompetenceService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private recupservice: RecupereService) {}
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.addForm.controls;
  }
competences: Competence[];
  addForm: FormGroup;
  submitted = false;
  @ViewChild('target', { read: ViewContainerRef, static: false })
  target: ViewContainerRef;
  toppingsControl = new FormControl([]);
  // tslint:disable-next-line:typedef
  addItem(newItem) {
    console.log(newItem);
  }
  // tslint:disable-next-line:typedef
  addnew(){
    return this.loadComponent();
  }
  // tslint:disable-next-line:typedef
  loadComponent() {
    //this.target.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddcompetenceComponent);
    const componentRef = this.target.createComponent(factory);
    return componentRef;
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
    if (this.addForm.errors === null){
      this.submitted = true;
      // @ts-ignore
      //this.addForm.get('competence').setValue(this.toppingsControl.value);
      this.addForm.value.competence.push(this.recupservice.recup);
      for (const t of this.toppingsControl.value){
      this.addForm.value.competence.push(t);
      }
      //console.log(this.loadComponent().instance.onSubmit());
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
}
