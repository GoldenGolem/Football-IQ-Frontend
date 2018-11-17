import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'my-app-header',
  styles: [],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
  public AppConfig: any;
  public isAdmin: any;
  public userName: any;
  public adminId: any;

constructor(
   private router: Router
  ) {


  }
  ngOnInit() {
    this.AppConfig = APPCONFIG;
    let userData = JSON.parse(localStorage.getItem('userdata'));
    console.log(userData.isAdmin);
    this.isAdmin = userData.isAdmin;
    this.userName = userData.user.username;
    this.adminId = userData.adminId;
  }

  clickBackToAdminPanel(adminid){

  
    
    let userData = JSON.parse(localStorage.getItem('userdata'));
    if(userData.user.realm=='user'){
     
      userData.userId=userData.adminId;
      userData.user.id=userData.adminId;
      userData.user.username=userData.adminName;
      // userData.user.username=userdeatil.username;
      // userData.user.email=userdeatil.email;
      userData.user.realm='manager';
       userData.adminId='';
      userData.isAdmin=false;
     console.log(userData.id);
    console.log(userData);
    localStorage.setItem('userdata',JSON.stringify(userData))
   this.router.navigate(['/user-managment']);
    window.location.reload();
  }
}
}
