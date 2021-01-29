import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-addprofilsortie',
  templateUrl: './addprofilsortie.component.html',
  styleUrls: ['./addprofilsortie.component.css']
})
export class AddprofilsortieComponent implements OnInit {
  submitted = false;
  addForm: FormGroup;
  constructor() { }
  get f()
  {
    return this.addForm.controls;
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
  }
  ngOnInit(): void {
  }

}
