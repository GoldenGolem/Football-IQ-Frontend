import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import {AppSettings} from '../constant';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

import { Player } from '../../core/models/player';

@Injectable()
export class TargetService {

   
   
  private headers = new Headers({'Content-Type': 'application/json'});

  private apiUrl = AppSettings.API_ENDPOINT;
  private userData ;
  private userToken;
 

  constructor(private http: Http,private route: ActivatedRoute) { 
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.userToken = this.userData.id;
  }

  createTarget(targetData: any): Promise<any> {
  let addToTargetUrl = this.apiUrl + 'targets?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToTargetUrl, targetData, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }

  createTargetWhenAddPlayer(targetData: any): Observable<any> {
  let addToTargetUrl = this.apiUrl + 'targets?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToTargetUrl, targetData, {headers: this.headers})
       .map(res =>  res.json())   
      .catch(this.handleError);
  }


 updateTarget(targetData: any, task_id: any): Promise<any> {
  let updateToTargetUrl = this.apiUrl + 'targets/'+task_id+'?access_token=' + this.userToken;  // URL to web api
   
// console.log(targetData); debugger
    return this.http
      .put(updateToTargetUrl, targetData, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }

  
  removeTarget(targetPlayers: any): Promise<any> {
   let removefromWatchlistUrl = this.apiUrl + 'targets/'+targetPlayers+'?access_token=' + this.userToken;   // URL to web api
      return this.http
      .delete(removefromWatchlistUrl,  {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }

 
  getTarget(): Promise<Player[]> {
  
    /* code to get url parameter */
   //alert(season+' '+scope+' '+league+' '+lc);
   
   /* building the url for data*/
   let targetUrl = '';
   let filterJson = {"counts":"targetPlayers","where":{"user_id":this.userData.userId}};
   let filterQuery = JSON.stringify(filterJson);
   
       targetUrl = this.apiUrl + 'targets?filter=' + filterQuery + '&access_token=' + this.userToken; 
  
   /* building the url for data*/

  //alert(playerUrl);
    return this.http.get(targetUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

   getTargetDetail(t_id:any): Promise<Player[]> {
  
    /* code to get url parameter */
   //alert(season+' '+scope+' '+league+' '+lc);
   
 let shortlistUrl = '';
   
       shortlistUrl = this.apiUrl + 'targets/' + t_id + '?access_token=' + this.userToken; 
  
   /* building the url for data*/

  //alert(playerUrl);
    return this.http.get(shortlistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
