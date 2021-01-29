import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthenticationService,
              private route: ActivatedRoute) {
  }
  user: User;
  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions typedef
    jQuery(function($) {
      // tslint:disable-next-line:typedef
      $('.sidebar-dropdown > a').click(function() {
        $('.sidebar-submenu').slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass('active')
        ) {
          $('.sidebar-dropdown').removeClass('active');
          $(this)
            .parent()
            .removeClass('active');
        } else {
          $('.sidebar-dropdown').removeClass('active');
          $(this)
            .next('.sidebar-submenu')
            .slideDown(200);
          $(this)
            .parent()
            .addClass('active');
        }
      });
      // tslint:disable-next-line:only-arrow-functions typedef
      $('#close-sidebar').click(function() {
        $('.page-wrapper').removeClass('toggled');
      });
      // tslint:disable-next-line:only-arrow-functions typedef
      $('#show-sidebar').click(function() {
        $('.page-wrapper').addClass('toggled');
      });
    });
    this.auth.getbyLogin().subscribe(
      res => {
        this.user = res;
      }
    );
    //console.log(this.route.snapshot.routeConfig.path);
  }

  // tslint:disable-next-line:typedef
  deconnexion(){
    this.auth.logout();
  }
}
