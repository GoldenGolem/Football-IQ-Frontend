import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
 
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

import { Player } from '../../core/models/player';
import {AppSettings} from '../constant';


@Injectable()
export class UsermanagmentService {

   
   
  private headers = new Headers({'Content-Type': 'application/json'});
   private apiUrl = AppSettings.API_ENDPOINT;
  private userData ;
  private userToken;
 

  constructor(private http: Http,private route: ActivatedRoute) { 
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.userToken = this.userData.id;
  }

  getUsersList(): Promise<any> {
    let filterJson = {"counts":["shortlistPlayers","watchlists"],"where":{"realm":"user"}}
   let filterQuery = JSON.stringify(filterJson);
 let getToUserslistUrl = this.apiUrl + 'users?filter=' + filterQuery + '&access_token=' + this.userToken;   // URL to web api
   

     return this.http.get(getToUserslistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);  }  

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
