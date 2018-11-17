import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import {AppSettings} from '../constant';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DashboardService {

   
   
  private headers = new Headers({'Content-Type': 'application/json'});
  // private apiUrl = 'http://localhost:3000/api/';
  private apiUrl = AppSettings.API_ENDPOINT;
  private userData;
  private userToken;
 

  constructor(private http: Http,private route: ActivatedRoute) { 
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.userToken = this.userData.id;
  }

  getDashboardList(): Promise<any> {
    let filterJson = {
 "include":[
  {
   "relation":"watchlists",
   "scope": { 
    "limit":5 ,
    "include": { 
     "relation": "playersMaster"
    }
   }
  },
  {
   "relation":"shortlistPlayers",
   "scope": { 
    "limit":5 ,
    "include": [
     { 
      "relation": "playersMaster"
     },
     { 
      "relation": "shortlist",
      "scope":{
       "fields": ["id","shortlist_name"]
      }
     }

    ]
   }
  },
  {
   "relation":"targetPlayers",
   "scope": { 
    "limit":5 ,
    "include": [
     { 
      "relation": "playersMaster"
     },
     { 
      "relation": "target",
      "scope":{
       "fields": ["id","target_name"]
      }
     }

    ]
   }
  }
 ]
}
   let filterQuery = JSON.stringify(filterJson);
 let getToDashboardlistUrl = this.apiUrl + 'users/'+this.userData.userId+'?filter=' + filterQuery + '&access_token=' + this.userToken;   // URL to web api
   

     return this.http.get(getToDashboardlistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);  }  

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
