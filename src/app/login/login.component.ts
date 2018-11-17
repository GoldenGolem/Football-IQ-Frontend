import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { UserauthService } from '../core/services/userauth.service';

@Component({
  selector: 'my-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {

  }

  // doLogin(logindetails: Login): void {
 
  //   LoginService.userLogin(logindetails)
  //     .then(data => {
  //       this.bikes.push(bike);
  //       this.selectedBike = null;
  //     });
  // }
  
  // doLogin(username, password) {
  //   this.userApi.login({ email: email.value, password: password.value })
  //   .subscribe((token: SDKToken) => {
  //     this.authService.setUser(token);
  //     this.router.navigate(['/']);
  //   }, err => {
  //     alert(err && err.message ? err.message : 'Login failed!');
  //     password.value = '';
  //   });
  // }

  ngOnInit() {
  }

}
