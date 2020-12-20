import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../models/user';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  tab: any;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              public dialogRef: MatDialogRef<HomeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
    this.userService.getbyId(this.data.id).subscribe(
      res => {
        this.tab = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  close(){
    this.dialogRef.close();
    this.router.navigate(['home']);
  }

}
