import * as jQuery from 'jquery';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { APPCONFIG } from './config';
import { LayoutService } from './layout/layout.service';

// 3rd
import 'styles/material2-theme.scss';
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LayoutService],
})
export class AppComponent implements OnInit {
  public AppConfig: any;
  public userData;
  public usertype ;

  constructor(private router: Router) { }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    console.log("here in app component - ");
    console.log(this.userData);

     this.usertype = 'user';
    if(this.userData != null){
      this.usertype = this.userData.user.realm;
    }

    // Scroll to top on route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
  }
}
