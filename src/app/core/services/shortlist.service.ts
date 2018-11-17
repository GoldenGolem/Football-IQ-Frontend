import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import {AppSettings} from '../constant';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

import { Player } from '../../core/models/player';

@Injectable()
export class ShortlistService {

   
   
  private headers = new Headers({'Content-Type': 'application/json'});
  
  private apiUrl = AppSettings.API_ENDPOINT;
  private userData ;
  private userToken;
 

  constructor(private http: Http,private route: ActivatedRoute) { 
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.userToken = this.userData.id;
  }

  createShortList(shortlistData: any): Promise<any> {
  let addToShortlistUrl = this.apiUrl + 'shortlists?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToShortlistUrl, shortlistData, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }

  createShortListWhenAddPlayer(shortlistData: any): Observable<any> {
  let addToShortlistUrl = this.apiUrl + 'shortlists?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToShortlistUrl, shortlistData, {headers: this.headers})
       .map(res =>  res.json())   
      .catch(this.handleError);
  }


 updateShortList(shortlistData: any, task_id: any): Promise<any> {
  let updateToShortlistUrl = this.apiUrl + 'shortlists/'+task_id+'?access_token=' + this.userToken;  // URL to web api
   
// console.log(shortlistData); debugger
    return this.http
      .put(updateToShortlistUrl, shortlistData, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }

  
  removeShortList(shortlistPlayers: any): Promise<any> {
   let removefromWatchlistUrl = this.apiUrl + 'shortlists/'+shortlistPlayers+'?access_token=' + this.userToken;   // URL to web api
      return this.http
      .delete(removefromWatchlistUrl,  {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }

  removePlayersShortList(shortlistPlayers: any,s_id:any): Promise<any> {
   let removefromWatchlistUrl = this.apiUrl + 'shortlist_players/deleteFromShortlist?access_token=' + this.userToken;   // URL to web api
   let userData = JSON.parse(localStorage.getItem('userdata'));
   let allrequest = [];
   allrequest.push({
      "shortlist_id": s_id,
      "players": shortlistPlayers
    });
   let sendDataToRemove = {
     "dataToRemove" : allrequest
   }
    return this.http
      .post(removefromWatchlistUrl, sendDataToRemove, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }


  getShortlist(): Promise<Player[]> {
  
    /* code to get url parameter */
   //alert(season+' '+scope+' '+league+' '+lc);
   
   /* building the url for data*/
   let shortlistUrl = '';
   let filterJson = {"counts":"shortlistPlayers","where":{"user_id":this.userData.userId}};
   let filterQuery = JSON.stringify(filterJson);
   
       shortlistUrl = this.apiUrl + 'shortlists?filter=' + filterQuery + '&access_token=' + this.userToken; 
  
   /* building the url for data*/

  //alert(playerUrl);
    return this.http.get(shortlistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  getShortlistDetail(s_id:any): Promise<Player[]> {
  
    /* code to get url parameter */
   //alert(season+' '+scope+' '+league+' '+lc);
   
 let shortlistUrl = '';
   
       shortlistUrl = this.apiUrl + 'shortlists/' + s_id + '?access_token=' + this.userToken; 
  
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
