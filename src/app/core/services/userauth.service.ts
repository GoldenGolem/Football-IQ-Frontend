import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import 'rxjs/add/operator/toPromise';
import {AppSettings} from '../constant';
import { User } from "../models/user";

import { Headers, Http } from '@angular/http';


export const MOCK_USER = new User();
MOCK_USER._id = "1";
MOCK_USER.email = "foo@test.com";
MOCK_USER.username = "foo";
MOCK_USER.fullname = "Foo";
MOCK_USER.lastName = "Bar";
MOCK_USER.password = "password";


/**
 * The user service.
 */
@Injectable()
export class UserauthService {

  constructor(private http: Http) {

  }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private apiUrl = AppSettings.API_ENDPOINT;
  private loginApi = this.apiUrl + 'users/login?include=user';
  
  /**
   * True if authenticated
   * @type
   */
  private _authenticated = false;

  /**
   * Authenticate the user
   *
   * @param {string} email The user's email address
   * @param {string} password The user's password
   * @returns {Observable<User>} The authenticated user observable.
   */
  public authenticate(email: string, password: string): Observable<User> {
    // Normally you would do an HTTP request to determine to
    // attempt authenticating the user using the supplied credentials.
    
//return  this.http.get('https://footballiq-vidhema.herokuapp.com/api/users/5990329ea15f410011b019e1?access_token=94LFjenNsaZH98WRHgX6Cqb9GmbowpdhPK2e6iasUsa5VHXwY2yV6rbn7uMLEab8').catch(this.handleError);
 //return Observable.throw(new Error("Abhi tak nahi chala"));
    return this.http
      .post(this.loginApi, JSON.stringify({
"email":email,
"password":password
}), {headers: this.headers}) .map((response)=>{
              localStorage.setItem('userdata',JSON.stringify(response.json()))
    })
      .catch(this.handleError);
    // if (email === MOCK_USER.email && password === MOCK_USER.password) {
    //   this._authenticated = true;
    //   return Observable.of(mockuser);
    // }

    
  }


  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
	$(".preloaderbar").removeClass('active');
    return Observable.throw(new Error("Invalid email or password"));
  }

  /**
   * Determines if the user is authenticated
   * @returns {Observable<boolean>}
   */
  public authenticated(): Observable<boolean> {
    return Observable.of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    // Normally you would do an HTTP request to determine if
    // the user has an existing auth session on the server
    // but, let's just return the mock user for this example.
    return Observable.of(MOCK_USER);
  }

  /**
   * Create a new user
   * @returns {User}
   */
  public create(user: User): Observable<User> {
    // Normally you would do an HTTP request to POST the user
    // details and then return the new user object
    // but, let's just return the new user for this example.
    this._authenticated = true;
    return Observable.of(user);
  }

  /**
   * End session
   * @returns {Observable<boolean>}
   */
  public signout(): Observable<boolean> {
    // Normally you would do an HTTP request sign end the session
    // but, let's just return an observable of true.
    this._authenticated = false;
    return Observable.of(true);
  }


}