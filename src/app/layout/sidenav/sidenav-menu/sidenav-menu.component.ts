import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'my-app-sidenav-menu',
  styles: [],
  templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent implements OnInit {
  public AppConfig: any;
  public userData;
  public usertype ;
  public isAdmin ;
  public redirectTo(url): void {
      window.location.href = url;
      location.reload();
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userdata'));

     this.isAdmin=this.userData.isAdmin;
     this.usertype = 'user';
    if(this.userData != null){
      this.usertype = this.userData.user.realm;
    }
  }
}

