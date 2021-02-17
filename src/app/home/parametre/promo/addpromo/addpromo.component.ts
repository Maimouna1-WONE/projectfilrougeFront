import { Component, OnInit } from '@angular/core';
import {FormBuilder, ControlValueAccessor, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import {ReferentielService} from '../../../../services/referentiel.service';
import {Referentiel} from '../../../../models/referentiel';
import {PromoService} from '../../../../services/promo.service';
import {Promo} from '../../../../models/promo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addpromo',
  templateUrl: './addpromo.component.html',
  styleUrls: ['./addpromo.component.css']
})
export class AddpromoComponent implements OnInit {

  addForm: FormGroup;
  url = '../../../../../assets/unnamed.png';
  attente: any;
  submitted: boolean;
  titre: string; langue: string; lieu: string;
  // tslint:disable-next-line:variable-name
  description: string; reference_agate: string; fabrique: string;
  // tslint:disable-next-line:variable-name
  date_fin: Date; avatar: any; referentiel: any;
  referentiels: Referentiel[]; document: any;
  constructor(private formBuilder: FormBuilder,
              private referentielservice: ReferentielService,
              private promoservice: PromoService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      langue: ['', Validators.required],
      lieu: ['', Validators.required],
      fabrique: ['', Validators.required],
      reference_agate: ['', Validators.required],
      description: ['', Validators.required],
      referentiel: ['', Validators.required],
      date_fin: ['', Validators.required],
      avatar: ['', Validators.required],
      apprenant: this.formBuilder.array([], Validators.required),
      document: ['', Validators.required]
    });
    this.referentielservice.getAllreferentiels().subscribe(
      res => {
        this.referentiels = res;
      },
      error => {
        console.log(error);
      }
    );
    this.promoservice.getAttente().subscribe(
      res => {
        // console.log(res[0]['groupes'][0]['apprenants']);
        this.attente = res[0].groupes[0].apprenants;
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
  promogroupe(): FormArray {
    return this.addForm.get('apprenant') as FormArray;
  }
  newgroupe(): FormGroup {
    return this.formBuilder.group({
      app: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  addApprenant() {
    // @ts-ignore
    return (this.addForm.get('apprenant') as FormArray).push(this.newgroupe());
  }
  // tslint:disable-next-line:typedef
  OnSubmit(){
    this.submitted = true;
    const {libelle, reference_agate, referentiel, description, date_fin, langue, lieu, fabrique, apprenant, document} = this.addForm.value;
    const promo = new FormData();
    promo.append('libelle', libelle);
    promo.append('description', description);
    promo.append('lieu', lieu);
    promo.append('fabrique', fabrique);
    promo.append('reference_agate', reference_agate);
    promo.append('referentiel', referentiel);
    promo.append('date_fin', date_fin);
    promo.append('langue', langue);
    promo.append('document', this.document);
        // tslint:disable-next-line:triple-equals
    if (this.addForm.get('apprenant').value != []) {
          for (const ap of this.addForm.get('apprenant').value) {
            console.log(ap.app);
            promo.append('apprenant[]', ap.app);
          }
        }
    promo.append('avatar', this.avatar);
    this.promoservice.addPromo(promo).subscribe(
          res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Promo has been saved',
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
  onSelectFile(event){
    if (event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }
  // tslint:disable-next-line:typedef
  File(event){
    if (event.target.files && event.target.files[0]) {
      this.document = event.target.files[0];
    }
  }
}
