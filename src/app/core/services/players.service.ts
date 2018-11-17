import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import {AppSettings} from '../constant';
import 'rxjs/add/operator/toPromise';


import { Player } from '../../core/models/player';

@Injectable()
export class PlayersService {

   
   
  private headers = new Headers({'Content-Type': 'application/json'});

   // private apiUrl = 'http://localhost:3000/api/';
  private apiUrl = AppSettings.API_ENDPOINT;
  private userData ;
  private userToken;
 

  constructor(private http: Http,private route: ActivatedRoute) { 
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.userToken = this.userData.id;
    // console.log(this.userData);
  }

  createWatchList(watchlistPlayers: any): Promise<any> {
  let addToWatchlistUrl = this.apiUrl + 'watchlists?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToWatchlistUrl, watchlistPlayers, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }
  
  addInShortlist(shortlistPlayers: any,s_id: any): Promise<any> {
  let addToShortlistUrl = this.apiUrl + 'shortlists/'+s_id+'/shortlistPlayers?access_token=' + this.userToken;  // URL to web api
   console.log(shortlistPlayers);
   console.log(addToShortlistUrl);

    return this.http
      .post(addToShortlistUrl, shortlistPlayers, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }
  
  
  addInViewlist(viewlist: any): Promise<any> {
  let addToViewlistUrl = this.apiUrl + 'users/'+this.userData.userId+'/filterViews?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToViewlistUrl, viewlist, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
  }
  
  
  	getviewList(): Promise<any> {
 let getviewListUrl = this.apiUrl + 'users/'+this.userData.userId+'/filterViews?access_token=' + this.userToken;   // URL to web api
   

     return this.http.get(getviewListUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);  } 

    addInTarget(targetPlayers: any,t_id: any): Promise<any> {
  let addToTargetUrl = this.apiUrl + 'targets/'+t_id+'/targetPlayers?access_token=' + this.userToken;  // URL to web api
   

    return this.http
      .post(addToTargetUrl, targetPlayers, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as any)
      .catch(this.handleError);
    }

  removeWatchList(watchlistPlayers: any): Promise<any> {
   let removefromWatchlistUrl = this.apiUrl + 'watchlists/deleteFromWatchlist?access_token=' + this.userToken;   // URL to web api
   let userData = JSON.parse(localStorage.getItem('userdata'));
	 let allrequest = [];
	 allrequest.push({
		  "user_id": userData.userId,
		  "players": watchlistPlayers
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

   getFilterlist(viewId: any): Promise<any> {
   let filterlistUrl = this.apiUrl + 'users/'+this.userData.userId+'/filterViews/'+viewId+'?access_token=' + this.userToken;   // URL to web api
   
   return this.http.get(filterlistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
   }
 
  getPlayers(needKeys:any = 1 , limitList: any = 100, skipList: any = 0): Promise<Player[]> {
   let season = localStorage.getItem('search_season');
   let scope = localStorage.getItem('search_scope');
   let lc = '';
   let league = '';

   let search_league = localStorage.getItem('search_league');
   if(search_league){
     league = search_league.substring(search_league.indexOf('-')+1);
     lc = search_league.substring(0,search_league.indexOf('-'));
   }
   
   if(!season){ season = "2016"; }else{  season = season.substring(0,season.indexOf('-')); }
   if(!scope || scope == 'No Attribute'){ scope = "No Attribute"; }else {scope = scope.toLowerCase(); }
   if(!league || league == 'All League'){ league = "All League";  lc = ""; }
  
  /* code to get url parameter */
	let wtype = 0;
  let shortlistId = 0;
  let targetId = 0;
	this.route.params
	.subscribe((params: Params) => {
    if(typeof params.wtype != 'undefined'){
		  wtype = params.wtype;
    }

    if(typeof params.s_id != 'undefined'){
      shortlistId = params.s_id;
    }
    
    if(typeof params.t_id != 'undefined'){
      targetId = params.t_id;
    }


	});
    /* code to get url parameter */
   //alert(season+' '+scope+' '+league+' '+lc);
   
   /* building the url for data*/
   let playerUrl = '';


   // if(wtype){
       playerUrl = this.apiUrl + 'players_master/getListWithDetail?season='+season+'&lc='+league+'&lca='+lc+'&scope='+scope+'&limitList=' + limitList + '&skipList=' + skipList + '&userId=' + this.userData.userId  + '&watchlist=' + wtype + '&shortlistId=' + shortlistId + '&targetId=' + targetId + '&needKeys=' + needKeys + '&access_token=' + this.userToken; 
  /* }
   else{
    playerUrl = this.apiUrl + 'players_master/getListWithDetail?season='+season+'&lc='+league+'&lca='+lc+'&scope='+scope+'&limitList=50&skipList=0&userId=' + this.userData.userId  + '&watchlist=0&access_token=' + this.userToken;  // URL to web api
  }*/


   /* building the url for data*/

  //alert(playerUrl);
    return this.http.post(playerUrl,'')
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

    getCountPlayers(): Promise<any> {
    let filter={"counts":["shortlistPlayers","watchlists","targetPlayers"]}
   let filterQuery = JSON.stringify(filter);
 let getToUserslistUrl = this.apiUrl + 'users/'+this.userData.userId+'?filter=' + filterQuery + '&access_token=' + this.userToken;   // URL to web api
   

     return this.http.get(getToUserslistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);  } 

 getPlayerProfile(p_id:any,seasons_p:any,scope_p:any): Promise<any> {
    let playerProfiledata:any;
     let seasons_player_val='';
     let scope_player_val='';
    // playerProfiledata = JSON.parse(localStorage.getItem('playerProfiledata'));
    // console.log("playerProfiledata"+playerProfiledata);
    // if(playerProfiledata){
     seasons_player_val= 'playersStats'+seasons_p+'s';
     scope_player_val='players'+scope_p+'Attributes'+seasons_p+'s';
    // }else{
    //    localStorage.setItem('playerProfiledata', JSON.stringify({ 'scope_player_storage': 'Expected', 'seasons_player_storage': '2016' }));
    //     playerProfiledata = JSON.parse(localStorage.getItem('playerProfiledata'));
    //      seasons_player= 'playersStats'+playerProfiledata.seasons_player_storage+'s';
    //  scope_player='players'+playerProfiledata.scope_player_storage+'Attributes'+playerProfiledata.seasons_player_storage+'s';
    // }
    
    // let filter={"include":[seasons_player,scope_player,"injuryHistories","marketHistories","natTeamHistories","transferHistories"]}
    let filter={"include":[seasons_player_val,scope_player_val,"injuryHistories","marketHistories","natTeamHistories","transferHistories",{"relation": "watchlists","scope": {"where": {"user_id": this.userData.userId} }},{"relation": "shortlistPlayers","scope": {"where": {"user_id": this.userData.userId} }}]}
   let filterQuery = JSON.stringify(filter);
 let getToPlayerProfilelistUrl = this.apiUrl + 'players_master/'+p_id+'?filter=' + filterQuery + '&access_token=' + this.userToken;   // URL to web api
   

     return this.http.get(getToPlayerProfilelistUrl)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);  } 
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
