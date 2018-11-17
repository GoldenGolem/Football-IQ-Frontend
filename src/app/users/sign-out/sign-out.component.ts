import { Component, OnDestroy, OnInit } from "@angular/core";
import { Headers, Http } from '@angular/http';


// @ngrx
import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";

// rxjs
import { Observable } from "rxjs/Observable";

// actions
import { SignOutAction } from "../users.actions";
import {AppSettings} from '../../core/constant';


// reducers
import {
  getSignOutError,
  isAuthenticated,
  isAuthenticationLoading,
  State
} from "../../app.reducers";

@Component({
  templateUrl: "./sign-out.component.html",
  styleUrls: ["./sign-out.component.scss"]
})
export class SignOutComponent implements OnDestroy, OnInit {

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;
  private headers = new Headers({'Content-Type': 'application/json'});
  //private apiUrl = 'http://localhost:3000/api/';
  private apiUrl = AppSettings.API_ENDPOINT;
  private userData ;
  private userToken;

  /**
   * @constructor
   * @param {Store<State>} store
   */
  constructor(private http: Http,private store: Store<State>) { 
	this.userData = JSON.parse(localStorage.getItem('userdata'));
  this.userToken = '';
    if(this.userData != null){
      this.userToken = this.userData.id;
    }
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   */
  public ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
	 let logouturl = this.apiUrl + 'users/logout?access_token=' + this.userToken;   // URL to web api
	 this.http
      .post(logouturl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
	  localStorage.removeItem('userdata');
	  localStorage.clear();
  
    this.store.dispatch(new SignOutAction());
  }

  /**
   * Go to the home page.
   */
  public home() {
    this.store.dispatch(go("/"));
  }

  /**
   * To to the sign up page.
   */
  public signIn() {
    this.store.dispatch(go("/users/sign-in"));
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
