import 'rxjs/add/operator/switchMap';
import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params,Router  } from '@angular/router';
import { Location }                 from '@angular/common';
import { LayoutService } from '../layout/layout.service';
import { MdSnackBar, MdDialog } from '@angular/material'; 
//import { Player } from '../core/models/player';
import { PlayersService } from '../core/services/players.service';
import { ShortlistService } from '../core/services/shortlist.service';
import { TargetService } from '../core/services/target.service';
import { AddPlayerShortlistDialogComponent } from './add-player-shortlist/add-player-shortlist-dialog.component';
import { AddPlayerTargetDialogComponent } from './add-player-target/add-player-target-dialog.component';
import { AddOtherPlayerDialogComponent } from './add-player-shortlist/add-other-player/add-other-player-dialog.component';
// import { MdSnackBar, MdDialog } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog.component';
import { DialogResultExampleDialogComponent } from './dialog-result-example-dialog.component';
import * as yadcf from 'yadcf';
import {AppSettings} from '../core/constant';


var $ = require('jquery');
var jQuery = require('jquery');


var dt = require('datatables.net');

jQuery.fn.dataTable.Api.register( 'processing()', function ( show ) {
    return this.iterator( 'table', function ( ctx ) {
        ctx.oApi._fnProcessingDisplay( ctx, show );
    } );
} );
//var dtb = require('datatables.net-buttons');

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

var dtb = require( 'datatables.net-buttons/js/dataTables.buttons.js' );
var dtbc = require( 'datatables.net-buttons/js/buttons.colVis.js' );
var dtbh = require( 'datatables.net-buttons/js/buttons.html5.js' );  
// var dtbf = require( 'datatables.net-buttons/js/buttons.flash.js' ); 
var dtbp = require( 'datatables.net-buttons/js/buttons.print.js' );  
//var dts = require('datatables.net-select');

//var dtbtn = require('datatables.net-bu')
// var dtbs = require('datatables.net-bs');
// var dts = require('datatables.net-select');


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
   providers: [PlayersService,ShortlistService,TargetService],
   styleUrls: [
        "../../../node_modules/datatables.net-dt/css/jquery.dataTables.css",
        "../../../node_modules/datatables.net-buttons-dt/css/buttons.dataTables.css",
        "../../../node_modules/bootstrap/dist/css/bootstrap.css",
        "../../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
        "../../../node_modules/datatables.net-select-bs/css/select.bootstrap.css"
    ],
     encapsulation: ViewEncapsulation.None 
})
export class DashboardComponent implements OnInit , OnDestroy{



  /**
  * Load External JS files from CDN
  **/

 openDialog() {
    this.dialog.open(DialogOverviewExampleDialogComponent);
  }
  selectedOption;
  openDialogWithAResult() {
    const dialogRef = this.dialog.open(DialogResultExampleDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }

  openSnackBar(message: string, action: string) {
    this.layoutService.updatePreloaderState('hide');
    $('input[type="checkbox"]').prop('checked', false);
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  players: any;
  viewlist : any;
  playerKeys: string[];
  savedViews: string[];
  ViewArray : string[];
  rootNode : any;
  columnNames: any;
  shortlist_id:any;
  target_id:any;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "_id";
  public sortOrder = "asc";
  public userData;
  public usertype ;
  public isAdmin ;
  public loadingPlayersMessage = AppSettings.LOADING_PLAYERS;
  public apiUrl = AppSettings.API_ENDPOINT;
  

  constructor(
    private playersService: PlayersService,
    private shortlistService: ShortlistService,
    private targetService: TargetService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private layoutService: LayoutService,
    rootNode: ElementRef,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {

    this.rootNode = rootNode;
  }

  // selectedOption;
  openDialogWithAddPlayerInShortlistForm() {
    if(confirm(AppSettings.ADD_SHORTLIST_CONFIRM)){
      const dialogRef = this.dialog.open(AddPlayerShortlistDialogComponent);
       let instance = dialogRef.componentInstance;
      dialogRef.afterClosed().subscribe((result) => {
        this.selectedOption = result;
      });
    }    
  }

    // selectedOption;
  openDialogWithAddOtherPlayerInShortlistForm() {
    if(confirm(AppSettings.ADD_SHORTLIST_CONFIRM)){
      const dialogRef = this.dialog.open(AddOtherPlayerDialogComponent);
       let instance = dialogRef.componentInstance;
       instance.shortlist_id=this.shortlist_id;
       console.log(instance);
       console.log(this.shortlist_id);
      dialogRef.afterClosed().subscribe((result) => {
        this.shortlist_id =  this.shortlist_id;
      });
    }    
  }
   // selectedOption;
  openDialogWithAddPlayerInTargetForm() {
    const dialogRef = this.dialog.open(AddPlayerTargetDialogComponent);
     let instance = dialogRef.componentInstance;
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }



  public addToWatchlist(): void {
    let watchlistPlayers = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
    let ischecked=0;
        $('#' + this.datatableId).find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
         ischecked=1;
            if(playerIdSelected > 1){
                watchlistPlayers.push({
                  "user_id": userData.userId,
                  "player_id": playerIdSelected,
                  "usersId": userData.userId
                });
            }
        });
      if(ischecked==1) {
    this.playersService.createWatchList(watchlistPlayers)
      .then(res => {    
          this.openSnackBar(AppSettings.WATCHLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);    
      });
    }else{
      this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);    
    }
  }
  
  public removeFromWatchlist(): void {
    if(confirm(AppSettings.DELETE_WATCHLIST_CONFIRM)){
        let watchlistPlayers = [];
         let ischecked=0;
        let userData = JSON.parse(localStorage.getItem('userdata'));
        this.layoutService.updatePreloaderState('active');
        $('#' + this.datatableId).find('input[type="checkbox"]:checked').each(function () {
           ischecked=1;
           let playerIdSelected = $(this).val();
         
            if(playerIdSelected > 1){
                watchlistPlayers.push(
                   playerIdSelected
                );
            }
        });
       if(ischecked==1) {        
        this.playersService.removeWatchList(watchlistPlayers)
        .then(res => {
            this.openSnackBar(AppSettings.DELETE_WATCHLIST_SUCCESS,AppSettings.SNACK_BAR_ACTION);         
            window.location.reload();
          });
       }else{
        this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
      }
    }    
  }

  public removeFromShortlist(): void {
    if(confirm(AppSettings.DELETE_SHORTLIST_CONFIRM)){
        let shortlistPlayers = [];
         let ischecked=0;
        let userData = JSON.parse(localStorage.getItem('userdata'));
        this.layoutService.updatePreloaderState('active');
        $('#' + this.datatableId).find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
         ischecked=1;
            if(playerIdSelected > 1){
                shortlistPlayers.push(
                   playerIdSelected
                );
            }
        });
          if(ischecked==1) {   
    this.shortlistService.removePlayersShortList(shortlistPlayers,this.shortlist_id)
      .then(res => {
        this.openSnackBar(AppSettings.DELETE_SHORTLIST_SUCCESS,AppSettings.SNACK_BAR_ACTION);
        window.location.reload();
      });
      }else{
       this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
      }
    }
    
  }
  
   private listchange() {
  
   
   //console.log(selectedVal);
   //var currenturl = window.location.href;
   //currenturl = currenturl+'filtervalue='+selectedVal+';';
   //window.location.href=currenturl;
   //this.route.navigateByUrl('page_url/');
  
  //var currentUrl = this.router.url;
  //console.log(this.route.params);
  /*this.route.params.subscribe(params => {
         // this.companyId = params.companyId;
          console.log(params);
      console.log(Object.keys(params));
    //for(let 
     }); */
  //var paramstring = '59cfeece6c03a7001203e21c';
  localStorage.setItem('v_id',this.selectedView);
  window.location.reload();
  //this.router.navigate(['/app/search', paramstring]);
  
  
   //var refreshUrl = currentUrl.indexOf('someRoute') > -1 ? '/someOtherRoute' : '/someRoute';
    //this.route.navigateByUrl(refreshUrl).then(() => this.route.navigateByUrl(currentUrl));
    //this.initialise();
   //alert(selectedVal);
 }
  
    public removeFromTarget(): void {
    if(confirm(AppSettings.DELETE_TARGET_CONFIRM)){
        let targetPlayers = [];
         let ischecked=0;
        let userData = JSON.parse(localStorage.getItem('userdata'));
        this.layoutService.updatePreloaderState('active');
        $('#' + this.datatableId).find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
          ischecked=1;
            if(playerIdSelected > 1){
                targetPlayers.push(
                   playerIdSelected
                );
            }
        });
         if(ischecked==1) {   
    this.shortlistService.removePlayersShortList(targetPlayers,this.target_id)
      .then(res => {
        this.openSnackBar(AppSettings.DELETE_TARGET_SUCCESS,AppSettings.SNACK_BAR_ACTION);
        window.location.reload();
      });
      }else{
      this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
    }
    }
    
  }

  

  

   seasons : any;
   league : any;
   scope : any;
   lc : any;
   selectedValue: any;
   selectedSeason: any;
   selectedScope: any;
   selectedleague: any;
   selectedlc: any;
   showwtype : any;
   showstype : any;
   showttype : any;
   shortlistPlayersCount : any;
   targetPlayersCount : any;
   watchlistsCount : any;
   shortlistName:any;
   targetName:any;

   datatableId: any;
      view_id:any;
selectedView: any;
   
  ngOnDestroy(): void{
   // let oTable = window['table'];
   // console.log(oTable);
   $('#'+ this.datatableId).remove();
  // $('.yadcf-filter-wrapper').remove();

    // oTable.attr('class', '');
   // if(this.datatableId == 'playerSearch'){

     //oTable.destroy();
   // }
    // oTable.off();
    // oTable.find('[id^=yadcf]').hide();
    // oTable = $('table');
  }
   

  ngOnInit(): void {

    window['apiUrl'] = this.apiUrl;
  /* code to get url parameter */
    let wtype = 0;
    let s_id = 0;
    let t_id = 0;
    this.showwtype = true;
    this.showstype = true;
    this.showttype = true;
    this.shortlist_id=0;
    this.target_id=0;
    this.datatableId = "playerSearch";
  this.ViewArray= [];
  this.view_id = 0;
  this.route.params
  .subscribe((params: Params) => {
    wtype = params.wtype;
  });
window['route'] = this.route;
    this.route.params.subscribe((params: Params) => {
       s_id = params.s_id;
       this.shortlist_id=s_id;
    });
    this.route.params.subscribe((params: Params) => {
       t_id = params.t_id;
       this.target_id=t_id;
    });
  this.route.params.subscribe((params: Params) => {
  //var v_newid = params.v_id;
  var v_newid = localStorage.getItem('v_id');
  //alert(v_newid);
  if(typeof v_newid == 'undefined' || v_newid == null){
  this.view_id = 0;
  }else{
  this.selectedView = v_newid;
       this.view_id = v_newid;
    } 
    });
  localStorage.removeItem('v_id');
  
  
  if(wtype == 1){
        this.showwtype = false;
        this.datatableId = "playerWatchlist";
    } 
    console.log("s_id="+s_id);
    if(typeof s_id == 'undefined'){
       s_id=0;
       this.shortlist_id=0;
    } 
    if(typeof t_id == 'undefined'){
       t_id=0;
       this.target_id=0;
    }
    console.log("s_id="+s_id);
     console.log("showstype="+this.showstype);
     if(s_id != 0){
        this.showstype = false;
        this.datatableId = "playerShortlist";
    }  
    if(t_id != 0){
    this.showttype = false;
     this.datatableId = "playerTarget";
  } 
     console.log("showstype11="+this.showstype);   
    /* code to get url parameter */
  if(this.shortlist_id!=0){
    this.shortlistService.getShortlistDetail(this.shortlist_id).then(shortlistData => {
  this.shortlistName=shortlistData['shortlist_name'];
    });
  }
  if(this.target_id!=0){
    this.targetService.getTargetDetail(this.target_id).then(targetData => {
    this.targetName=targetData['target_name'];
    });
  }
  
  if(this.view_id != 0){
   this.playersService.getFilterlist(this.view_id).then(filterlist => {
   
   this.ViewArray = filterlist.view_columns.split(",");
   });
   }
     



    this.userData = JSON.parse(localStorage.getItem('userdata'));
     this.isAdmin=this.userData.isAdmin;
     this.usertype = 'user';
    if(this.userData != null){
      this.usertype = this.userData.user.realm;
    }
    
  this.seasons =
    {
      "2015-2016":"2015-2016",
      "2016-2017":"2016-2017",
      "2017-2018":"2017-2018"
    }
  
  this.scope =
    {
        "No Attribute": "No Attribute",
        "Domestic":"Domestic",
        "Universal":"Universal",
        "Expected":"Expected",
     }
  
  this.league =
  {
    "All League":"All League",
    "Albania-Superliga":"Albania-Superliga",
    "Albania-1st Division":"Albania-1st Division",
    "Algeria-Ligue 1":"Algeria-Ligue 1",
    "Argentina-Primera Division":"Argentina-Primera Division",
    "Argentina-Prim B Nacional":"Argentina-Prim B Nacional",
    "Argentina-Prim B Metro":"Argentina-Prim B Metro",
    "Argentina-Primera C":"Argentina-Primera C",
    "Armenia-Premier League":"Armenia-Premier League",
    "Australia-A-League":"Australia-A-League",
    "Austria-1. Liga":"Austria-1. Liga",
    "Austria-Bundesliga":"Austria-Bundesliga",
    "Austria-Regionalliga":"Austria-Regionalliga",
    "Austria-Jugendliga U18":"Austria-Jugendliga U18",
    "Austria-Landesliga":"Austria-Landesliga",
    "Azerbaijan-Premyer Liqa":"Azerbaijan-Premyer Liqa",
    "Azerbaijan-Reserve League":"Azerbaijan-Reserve League",
    "Bahrain-Premier League":"Bahrain-Premier League",
    "Belarus-Premier League":"Belarus-Premier League",
    "Belgium-Third Amateur Division":"Belgium-Third Amateur Division",
    "Belgium-First Division A":"Belgium-First Division A",
    "Belgium-First Division B":"Belgium-First Division B",
    "Belize-Premier League":"Belize-Premier League",
    "Bolivia-LFPB":"Bolivia-LFPB",
    "Bosnia and Herzegovina-Premier Liga":"Bosnia and Herzegovina-Premier Liga",
    "Brazil-Cearense 1":"Brazil-Cearense 1",
    "Brazil-Carioca 1":"Brazil-Carioca 1",
    "Brazil-Paulista A3":"Brazil-Paulista A3",
    "Brazil-Paulista A2":"Brazil-Paulista A2",
    "Brazil-Copa do Nordeste":"Brazil-Copa do Nordeste",
    "Brazil-Primeira Liga":"Brazil-Primeira Liga",
    "Brazil-Catarinense 1":"Brazil-Catarinense 1",
    "Brazil-Paulista A1":"Brazil-Paulista A1",
    "Brazil-Carioca U20":"Brazil-Carioca U20",
    "Brazil-Gaucho 1":"Brazil-Gaucho 1",
    "Brazil-Paranaense 1":"Brazil-Paranaense 1",
    "Brazil-Piauiense":"Brazil-Piauiense",
    "Brazil-Catarinense 2":"Brazil-Catarinense 2",
    "Bulgaria-First League":"Bulgaria-First League",
    "Bulgaria-Second League":"Bulgaria-Second League",
    "Bulgaria-Elite U19":"Bulgaria-Elite U19",
    "Burkina Faso-1ere Division":"Burkina Faso-1ere Division",
    "Chile-Primera Division":"Chile-Primera Division",
    "Chile-Primera B":"Chile-Primera B",
    "China PR-China League One":"China PR-China League One",
    "China PR-CSL":"China PR-CSL",
    "Colombia-Primera A":"Colombia-Primera A",
    "Colombia-Primera B":"Colombia-Primera B",
    "Congo DR-Super Ligue":"Congo DR-Super Ligue",
    "Costa Rica-Primera Division":"Costa Rica-Primera Division",
    "Cote d'Ivoire-Ligue 1":"Cote d'Ivoire-Ligue 1",
    "Croatia-1. HNL Juniori":"Croatia-1. HNL Juniori",
    "Croatia-1. HNL":"Croatia-1. HNL",
    "Croatia-2. HNL":"Croatia-2. HNL",
    "Cuba-Primera Division":"Cuba-Primera Division",
    "Cyprus-1. Division":"Cyprus-1. Division",
    "Czech Republic-FNL":"Czech Republic-FNL",
    "Czech Republic-Czech Liga":"Czech Republic-Czech Liga",
    "Czech Republic-1. Liga U19":"Czech Republic-1. Liga U19",
    "Denmark-Superliga":"Denmark-Superliga",
    "Denmark-U19 Ligaen":"Denmark-U19 Ligaen",
    "Denmark-U17 Ligaen":"Denmark-U17 Ligaen",
    "Denmark-1st Division":"Denmark-1st Division",
    "Denmark-U19 Division":"Denmark-U19 Division",
    "Denmark-U17 Division":"Denmark-U17 Division",
    "Denmark-Reserve League":"Denmark-Reserve League",
    "Denmark-2nd Division":"Denmark-2nd Division",
    "Ecuador-Primera A":"Ecuador-Primera A",
    "Egypt-Premier League":"Egypt-Premier League",
    "El Salvador-Primera Division":"El Salvador-Primera Division",
    "England-Premier League":"England-Premier League",
    "England-U18 Premier League":"England-U18 Premier League",
    "England-League One":"England-League One",
    "England-Championship":"England-Championship",
    "England-National League":"England-National League",
    "England-League Two":"England-League Two",
    "England-Premier League 2 (Division 1)":"England-Premier League 2 (Division 1)",
    "England-Nike Academy":"England-Nike Academy",
    "England-National League N / S":"England-National League N / S",
    "England-Premier League 2 (Division 2)":"England-Premier League 2 (Division 2)",
    "England-Youth Alliance":"England-Youth Alliance",
    "England-Professional Development League":"England-Professional Development League",
    "England-Non League Premier":"England-Non League Premier",
    "England-U18 Professional Development League":"England-U18 Professional Development League",
    "Estonia-Meistriliiga":"Estonia-Meistriliiga",
    "Europe-Future Talents Cup U17":"Europe-Future Talents Cup U17",
    "FYR Macedonia-First League":"FYR Macedonia-First League",
    "Finland-Veikkausliiga":"Finland-Veikkausliiga",
    "France-Ligue 2":"France-Ligue 2",
    "France-Ligue 1":"France-Ligue 1",
    "France-National":"France-National",
    "France-Championnat National U19":"France-Championnat National U19",
    "France-CFA 2":"France-CFA 2",
    "France-CFA":"France-CFA",
    "Germany-3. Liga":"Germany-3. Liga",
    "Germany-Regionalliga":"Germany-Regionalliga",
    "Germany-Bundesliga":"Germany-Bundesliga",
    "Germany-U19 Bundesliga":"Germany-U19 Bundesliga",
    "Germany-2. Bundesliga":"Germany-2. Bundesliga",
    "Germany-U-17 Bundesliga":"Germany-U-17 Bundesliga",
    "Germany-Oberliga":"Germany-Oberliga",
    "Greece-Super League":"Greece-Super League",
    "Greece-Football League":"Greece-Football League",
    "Greece-Super League K20":"Greece-Super League K20",
    "Guatemala-Liga Nacional":"Guatemala-Liga Nacional",
    "Guinea-Ligue 1":"Guinea-Ligue 1",
    "Honduras-Liga Nacional":"Honduras-Liga Nacional",
    "Hong Kong-Premier League":"Hong Kong-Premier League",
    "Hungary-NB I":"Hungary-NB I",
    "Hungary-NB II":"Hungary-NB II",
    "Hungary-U19 League":"Hungary-U19 League",
    "Hungary-NB III":"Hungary-NB III",
    "India-Indian Super League":"India-Indian Super League",
    "India-Calcutta Premier Division A":"India-Calcutta Premier Division A",
    "India-I-League":"India-I-League",
    "Iran-Persian Gulf Pro League":"Iran-Persian Gulf Pro League",
    "Iran-Azadegan League":"Iran-Azadegan League",
    "Iraq-Iraqi League":"Iraq-Iraqi League",
    "Israel-Liga Leumit":"Israel-Liga Leumit",
    "Israel-Ligat ha'Al":"Israel-Ligat ha'Al",
    "Israel-U19 Elite Division":"Israel-U19 Elite Division",
    "Italy-Lega Pro":"Italy-Lega Pro",
    "Italy-Serie A":"Italy-Serie A",
    "Italy-Campionato Nazionale Primavera":"Italy-Campionato Nazionale Primavera",
    "Italy-Serie B":"Italy-Serie B",
    "Italy-Eccellenza":"Italy-Eccellenza",
    "Italy-Campionato Nazionale Under 17 A&amp;B":"Italy-Campionato Nazionale Under 17 A&amp;B",
    "Italy-Serie D":"Italy-Serie D",
    "Italy-Campionato Nazionale Allievi Lega Pro":"Italy-Campionato Nazionale Allievi Lega Pro",
    "Italy-Promozione":"Italy-Promozione",
    "Japan-J2 League":"Japan-J2 League",
    "Japan-J1 League":"Japan-J1 League",
    "Jordan-League":"Jordan-League",
    "Kazakhstan-Premier League":"Kazakhstan-Premier League",
    "Kazakhstan-Reserve League":"Kazakhstan-Reserve League",
    "Korea Republic-K League Classic":"Korea Republic-K League Classic",
    "Korea Republic-K League Challenge":"Korea Republic-K League Challenge",
    "Kuwait-Premier League":"Kuwait-Premier League",
    "Latvia-Virsliga":"Latvia-Virsliga",
    "Lebanon-Premier League":"Lebanon-Premier League",
    "Libya-Premier League":"Libya-Premier League",
    "Lithuania-1 Lyga":"Lithuania-1 Lyga",
    "Lithuania-A Lyga":"Lithuania-A Lyga",
    "Luxembourg-National Division":"Luxembourg-National Division",
    "Malaysia-Super League":"Malaysia-Super League",
    "Malta-Premier League":"Malta-Premier League",
    "Mexico-Ascenso MX":"Mexico-Ascenso MX",
    "Mexico-Liga MX":"Mexico-Liga MX",
    "Mexico-U20 League":"Mexico-U20 League",
    "Moldova-Divizia Na?ionala":"Moldova-Divizia Na?ionala",
    "Montenegro-First League":"Montenegro-First League",
    "Morocco-Botola Pro":"Morocco-Botola Pro",
    "Netherlands-Eerste Divisie":"Netherlands-Eerste Divisie",
    "Netherlands-Eredivisie":"Netherlands-Eredivisie",
    "Netherlands-Tweede Divisie":"Netherlands-Tweede Divisie",
    "Netherlands-Eredivisie U19":"Netherlands-Eredivisie U19",
    "Nicaragua-Primera Division":"Nicaragua-Primera Division",
    "Norway-Obos Ligaen":"Norway-Obos Ligaen",
    "Norway-Eliteserien":"Norway-Eliteserien",
    "Oman-Professional League":"Oman-Professional League",
    "Panama-LPF":"Panama-LPF",
    "Paraguay-Division Profesional":"Paraguay-Division Profesional",
    "Peru-Primera Division":"Peru-Primera Division",
    "Poland-Ekstraklasa":"Poland-Ekstraklasa",
    "Poland-I Liga":"Poland-I Liga",
    "Poland-Central Youth League":"Poland-Central Youth League",
    "Portugal-Primeira Liga":"Portugal-Primeira Liga",
    "Portugal-Segunda Liga":"Portugal-Segunda Liga",
    "Portugal-Campeonato Safina":"Portugal-Campeonato Safina",
    "Portugal-Campeonato de Portugal Prio":"Portugal-Campeonato de Portugal Prio",
    "Portugal-Juniores U17":"Portugal-Juniores U17",
    "Portugal-Juniores U19":"Portugal-Juniores U19",
    "Qatar-Stars League":"Qatar-Stars League",
    "Qatar-Q League":"Qatar-Q League",
    "Romania-Liga II":"Romania-Liga II",
    "Romania-Liga I":"Romania-Liga I",
    "Romania-Liga III":"Romania-Liga III",
    "Russia-Premier League":"Russia-Premier League",
    "Russia-FNL":"Russia-FNL",
    "Russia-PFL":"Russia-PFL",
    "Russia-U21 Premier League":"Russia-U21 Premier League",
    "Russia-Irtysh Cup":"Russia-Irtysh Cup",
    "Saudi Arabia-Pro League":"Saudi Arabia-Pro League",
    "Scotland-League Two":"Scotland-League Two",
    "Scotland-Premiership":"Scotland-Premiership",
    "Scotland-Championship":"Scotland-Championship",
    "Scotland-Development League":"Scotland-Development League",
    "Scotland-League One":"Scotland-League One",
    "Senegal-Ligue 1":"Senegal-Ligue 1",
    "Serbia-Super Liga":"Serbia-Super Liga",
    "Serbia-Prva Liga":"Serbia-Prva Liga",
    "Singapore-S.League":"Singapore-S.League",
    "Slovakia-Super Liga":"Slovakia-Super Liga",
    "Slovakia-2. liga":"Slovakia-2. liga",
    "Slovakia-U19 League":"Slovakia-U19 League",
    "Slovakia-3. liga":"Slovakia-3. liga",
    "Slovenia-1. SNL":"Slovenia-1. SNL",
    "Slovenia-2. SNL":"Slovenia-2. SNL",
    "Slovenia-3. SNL":"Slovenia-3. SNL",
    "Slovenia-1. SML U19":"Slovenia-1. SML U19",
    "South Africa-PSL":"South Africa-PSL",
    "South Africa-1st Division":"South Africa-1st Division",
    "Spain-Segunda B":"Spain-Segunda B",
    "Spain-Segunda Division":"Spain-Segunda Division",
    "Spain-Primera Division":"Spain-Primera Division",
    "Spain-Tercera Division":"Spain-Tercera Division",
    "Spain-Division de Honor Juvenil":"Spain-Division de Honor Juvenil",
    "Sweden-Superettan":"Sweden-Superettan",
    "Sweden-Allsvenskan":"Sweden-Allsvenskan",
    "Switzerland-Super League":"Switzerland-Super League",
    "Switzerland-Challenge League":"Switzerland-Challenge League",
    "Switzerland-1. Liga Classic":"Switzerland-1. Liga Classic",
    "Switzerland-U18 League":"Switzerland-U18 League",
    "Syria-Premier League":"Syria-Premier League",
    "Thailand-Thai League":"Thailand-Thai League",
    "Thailand-Thai League 2":"Thailand-Thai League 2",
    "Trinidad and Tobago-T &amp; T Pro League":"Trinidad and Tobago-T &amp; T Pro League",
    "Tunisia-Ligue 1":"Tunisia-Ligue 1",
    "Turkey-Super Lig":"Turkey-Super Lig",
    "Turkey-2. Lig":"Turkey-2. Lig",
    "Turkey-1. Lig":"Turkey-1. Lig",
    "Turkey-3. Lig":"Turkey-3. Lig",
    "Turkey-U21 Super Lig":"Turkey-U21 Super Lig",
    "Turkey-U19 Elit Ligi":"Turkey-U19 Elit Ligi",
    "USA-NASL":"USA-NASL",
    "USA-Diamond Cup":"USA-Diamond Cup",
    "USA-MLS":"USA-MLS",
    "USA-USL":"USA-USL",
    "USA-NCAA Mens Soccer":"USA-NCAA Mens Soccer",
    "Uganda-Premier League":"Uganda-Premier League",
    "Ukraine-Persha Liga":"Ukraine-Persha Liga",
    "Ukraine-Premier League":"Ukraine-Premier League",
    "Ukraine-Druha Liga":"Ukraine-Druha Liga",
    "Ukraine-U19 League":"Ukraine-U19 League",
    "Ukraine-U21 League":"Ukraine-U21 League",
    "Ukraine-U17 League":"Ukraine-U17 League",
    "United Arab Emirates-Arabian Gulf League":"United Arab Emirates-Arabian Gulf League",
    "United Arab Emirates-Division 1":"United Arab Emirates-Division 1",
    "Uruguay-Primera Division":"Uruguay-Primera Division",
    "Uzbekistan-PFL":"Uzbekistan-PFL",
    "Venezuela-Primera Division":"Venezuela-Primera Division",
    "Vietnam-V.League 1":"Vietnam-V.League 1",
    "Wales-Premier League":"Wales-Premier League",
    "World-Other Friendlies":"World-Other Friendlies",
    "World-Copa Chivas Internacional U18":"World-Copa Chivas Internacional U18",
    "Zambia-Super League":"Zambia-Super League",
  }
  
  this.lc =
  {
    "Greece" : "Greece",
  }
  
  this.selectedSeason = localStorage.getItem('search_season');
  this.selectedScope = localStorage.getItem('search_scope');
  this.selectedleague = localStorage.getItem('search_league');
  this.selectedlc = localStorage.getItem('search_lc');
  

 this.playersService.getCountPlayers().then(players => {
    console.log(players);
    this.shortlistPlayersCount =players.shortlistPlayersCount;
    this.targetPlayersCount=players.targetPlayersCount;
    this.watchlistsCount=players.watchlistsCount;
 });
 
  this.playersService.getviewList().then(viewlist => {
  this.savedViews = [];
  
  for (let viewcheck of viewlist) {
   this.savedViews[viewcheck.id] = viewcheck.view_name;
      }
   
    
 });
 

 window['playersService'] = this.playersService;
  
    this.playersService.getPlayers(1,1,0).then(players => {
      this.players =  players['data'];
      this.playerKeys = [];

      let keysToRemove = [0,1,2,3,4,5,6,7,8];

      if(this.players.length > 0){
        this.playerKeys = Object.keys(this.players[0]);
        
        for (let keyToRemove in keysToRemove) {
            if (typeof  this.playerKeys[0] != 'undefined' && this.playerKeys[0] == keyToRemove){
              this.playerKeys.shift();
            }
        }
        /*if (typeof  this.playerKeys[0] != 'undefined' && this.playerKeys[0] == '2'){
            this.playerKeys.shift();
        }*/
      }
        console.log(this.playerKeys);

      this.columnNames = [];

      for (let playerKey of this.playerKeys) {
        this.columnNames.push({ name : playerKey });
      }
//console.log(this.columnNames);

     window["columnNames"] = this.columnNames;


      let column_yadcf = [];
      let basicArray = [];
      let playerKey = '';
      let playerValue = '';
      let playerValueType = '';
      let playerFilterType = '';
      let playerKeyIndex = '';

      let playerKeysFilter = [];
      if(this.players.length > 0)
      {
        playerKeysFilter = Object.keys(this.players[0]);

        for (let keyToRemove in keysToRemove) {
            if (typeof  playerKeysFilter[0] != 'undefined' && playerKeysFilter[0] == keyToRemove){
              playerKeysFilter.shift();
            }
        }
        /*
        if (typeof  playerKeysFilter[0] != 'undefined' && playerKeysFilter[0] == '2'){
            playerKeysFilter.shift();
        }*/
      }
      //playerKeysFilter.shift();
      basicArray[0] ="full_name";
  if(this.ViewArray.length > 0){
  basicArray = basicArray.concat(this.ViewArray);
  //console.log('aa gaya hai don');
  }
  else{
  
  
  
  basicArray[1] ="current_team_name";
  basicArray[2] ="positions";
  basicArray[3] ="birth_date";
  basicArray[4] ="age";
  basicArray[5] ="market_value";
  basicArray[6] ="contract_expires";
  basicArray[7] ="total_matches";
  basicArray[8] ="minutes_on_field";
  basicArray[9] ="minutes_per_app";
  basicArray[10] ="foot";
  basicArray[11] ="goals";
  basicArray[12] ="current_competition";
  basicArray[13] ="passport_country_codes";
  basicArray[14] ="height";
  basicArray[15] ="weight";
  basicArray[16] ="current_competition_country";
  
  }
    let playerListTitle = [];
    let indexArray = [];
      for (let playerKeyIndex in playerKeysFilter) {

        playerKey = playerKeysFilter[playerKeyIndex];


        //column_yadcf[playerKeyIndex] = playerKey;
    if(basicArray.indexOf(playerKey) < 0 && playerKeyIndex != '0')
    {
      indexArray.push(parseInt(playerKeyIndex));
    }
        playerValue = this.players[0][playerKey];
playerListTitle[playerKey] = playerKey.replace(/\_/g, ' ');
        playerValueType = typeof playerValue;

       



        switch(playerValueType) { 
           case "string": { 
              playerFilterType = "text";
              column_yadcf.push({
                "column_number" : playerKeyIndex,
                "filter_type": playerFilterType ,
                "filter_container_id": playerKey,
                "filter_delay": 1000
              });
              break; 
           } 
           case "number": { 
              playerFilterType = "range_number";
              column_yadcf.push({
                "column_number" : playerKeyIndex,
                "filter_type": playerFilterType ,
                "filter_container_id": playerKey,
                "filter_delay": 1000
              });
              break; 
           } 
           case "object": {
              playerFilterType = "range_number";
              column_yadcf.push({
                "column_number" : playerKeyIndex,
                "filter_type": playerFilterType ,
                "filter_container_id": playerKey,
                "filter_delay": 1000
              });
              break;    
           }            
           default: { 
              playerFilterType = "text";
              column_yadcf.push({
                "column_number" : playerKeyIndex,
                "filter_type": playerFilterType ,
                "filter_container_id": playerKey,
                "filter_delay": 1000
              });
              break;              
           } 
        }


      }
      console.log(playerListTitle);
        window["column_yadcf"] = column_yadcf;
        window["datatableId"] = this.datatableId;

     indexArray.shift();
console.log('indexArray');
console.log(indexArray);
         $(this.rootNode.nativeElement).ready(function() {
           setTimeout(function(){
              this.columnNames = window["columnNames"] ;
              this.datatableId = window["datatableId"] ;
    //console.log(this.columnNames);
    // "deferRender": true,

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

let wtype = 0;
  let shortlistId = 0;
  let targetId = 0;
  this.route = window['route'];
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



this.apiUrl = window['apiUrl'];
   this.userData = JSON.parse(localStorage.getItem('userdata'));
       let dturl = this.apiUrl + 'players_master/getListWithDetail?season='+season+'&lc='+league+'&lca='+lc+'&scope='+scope+'&limitList=25&skipList=0&userId=' + this.userData.userId  + '&watchlist=' + wtype + '&shortlistId=' + shortlistId + '&targetId=' + targetId + '&needKeys=0&access_token=' + this.userToken; 
    // let dturl = "https://footballiq-vidhema.herokuapp.com/api/players_master/getListWithDetail?season=2016&lc=All%20League&lca=&scope=expected&limitList=1&skipList=0&userId=59efb2637c565a0012378ada&watchlist=0&shortlistId=0&targetId=0&needKeys=0&access_token=DAUXDr762rGwEv1IQMf2U46lDwECSk7dCh976AwAU9tB2FauSStuaMbVbgevUTwT";
 let table =  $('#' + this.datatableId).DataTable( {
"processing": true,
            "serverSide": true,
        ajax: {
              url: dturl,
              type: "POST",
              "data": function ( d ) {
                  var sortColumn = d['order'][0]['column'];
                  var sortColumnDir = d['order'][0]['dir'] == 'asc' ? 1 : -1;
                  var sortColumnName =  d['columns'][sortColumn]['name'];
                  for (var i = 0; i < d['columns'].length; i++) {
                      if (d['columns'][i]['searchable'] == false || d['columns'][i]['searchable'] == 'false' || d['columns'][i]['search']['value'] == '') {         
                        d['columns'].splice(i, 1);
                        i--;
                      }
                    }

                    if(sortColumnName == '_id'){
                      sortColumnDir = -1;
                    }
                   d.sortColumnName = sortColumnName;
                   d.sortColumnDir = sortColumnDir;
                   d.limitList = d.length;
                   d.skipList = d.start;


                   delete d['order'];
  // delete d['search'];
  // delete d['columns'];
  // console.log('d');
  // console.log(d);
  // let sendQuery = {
  //   "startRecords" : d.start,
  //   "limitRecords" : d.length
  // }
  //              return sendQuery;
                // d.custom = $('#myInput').val();
                // etc
                }
          },


"language" : {
  "processing" : "Please wait while we are loading Players  ... "
},
 "pagingType": "first_last_numbers",
    "lengthMenu": [[25, 50, 75, 100], [25, 50, 75, 100]],
    "buttons": [
      
       {
          "extend" : 'pdfHtml5',
          "exportOptions": {
                    "columns": ":visible"
                },
          "title" : function() {
              return "Players List";
          },
          "orientation" : 'landscape',
          "pageSize" : 'A0',
          "text" : '<strong class="fa fa-file-pdf-o">Export to PDF</strong>',
          "titleAttr" : 'PDF'
      } 
    ],
    "columns":this.columnNames,
    "dom": 'Blfrtip',
    'columnDefs': [{
         'targets': 0,
          "searchable": false,
          "orderable": false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
         }
    },
  {
    "targets": indexArray,
    "visible": false
  }
 ],
    "searching": true
 });    


$('.dataTables_processing', $('#' + this.datatableId).closest('.dataTables_wrapper')).show();

/* ajax: {
url: dturl,
type: "POST",
"data": function ( d ) {
 // delete d['order'];
  delete d['search'];
  delete d['columns'];
  // console.log('d');
  // console.log(d);
  // let sendQuery = {
  //   "startRecords" : d.start,
  //   "limitRecords" : d.length
  // }
  //              return sendQuery;
                // d.custom = $('#myInput').val();
                // etc
            }
},*/
        /* let table =  $('#' + this.datatableId).DataTable( {
"deferRender": true,
"ajax": "http://localhost:3000/api/players_master/getListWithDetail?season=2016&lc=All%20League&lca=&scope=No%20Attribute&limitList=20&skipList=0&userId=59b5684883710d1358583c93&watchlist=0&shortlistId=0&targetId=0&needKeys=0&access_token=YAAvyRGeND9ZPAuHsENtw5CoPQPNefCE4tQj8MrN49e1ZGCeQnynHGzfVK6v9lvd",
"columns":this.columnNames,
    "pagingType": "first_last_numbers",
    "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "All"]],
    "buttons": [
      
       {
          "extend" : 'pdfHtml5',
          "exportOptions": {
                    "columns": ":visible"
                },
          "title" : function() {
              return "Players List";
          },
          "orientation" : 'landscape',
          "pageSize" : 'A0',
          "text" : '<strong class="fa fa-file-pdf-o">Export to PDF</strong>',
          "titleAttr" : 'PDF'
      } 
    ],
   // "pageLength": 10,
     'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
         }
    },
  {
    "targets": indexArray,
    "visible": false
  }
 ],
    "dom": 'Blfrtip',
    "searching": true
  });*/


       
if(this.columnNames.length > 0){

let column_yadcf = window["column_yadcf"];

//if (this.datatableId == 'playerSearch') {

        // Add YADCF
        console.log('init yadcf here');
        yadcf.init(table, column_yadcf);
/*   } else {
     console.log('removing yadcf here');
     localStorage.setItem('first','true');
        table = $('table');
        table.find('tfoot').find('[id^=yadcf-filter-wrapper-table]').each(function (i, v) {
            var cloned = $(this).clone(true);
            console.log( $(this) );
            $(this).closest('th').append( cloned );
            $(this).remove();
            table.find('.DataTables_sort_wrapper').css('display', 'inline-block');
        });
        table.find('[id^=yadcf]').show();
    }*/

}

/* setTimeout( function(){
let limitList = 1000;
let skipList = 0;

 setTimeout( function(){

    let datatableId = window["datatableId"];
    
    $('.dataTables_processing', $('#' + datatableId).closest('.dataTables_wrapper')).show();

    addMoreRows(table , limitList , skipList);
    
   
  }, 1 );

 }, 1 );*/

function addMoreRows(myTable, limitList, skipList){

    let playersService = window['playersService'];
playersService.getPlayers(0 , limitList , skipList).then(players => {
      let playersData =  players['data'];
      

      if(playersData.length > 0){
       
        myTable.rows.add(playersData);
                myTable.draw();
                skipList = limitList;
              limitList = skipList + 1000;
    
             
               setTimeout( function(){
              
            addMoreRows(table , limitList , skipList);
          }, 1 );
            

      }else{
        let datatableId = window["datatableId"];

         $('.dataTables_processing', $('#' + datatableId).closest('.dataTables_wrapper')).hide();

      }
      });
   
  }

window["column_yadcf"] = '';
        window['table'] = table;

        $('#dataTableLoading').hide('slow');

            $('#example-select-all').on('click', function(){

               // Get all rows with search applied
               var rows = table.rows({ 'search': 'applied' }).nodes();
               // Check/uncheck checkboxes for all rows in the table
               $('input[type="checkbox"]', rows).prop('checked', this.checked);
               //$('input[type="checkbox"]').prop('checked', this.checked);
            });

$("#examplePaginate").append($(".dataTables_paginate"));
$("#examplePageLength").append($(".dataTables_length"));
$("#pdfbutton").append($(".dt-buttons"));
$("#dataTableInfo").append($(".dataTables_info"));

   
      
      $('body').on('click','md-checkbox.toggle-vis', function (e) {
       //$('md-checkbox.toggle-vis').on( 'click', function (e) {
        // Get the column API object
        // console.log('I m here');
        // var column = table.column( $(this).attr('data-column') + ':name' );
        // var isChecked = $(this).find('.mat-checkbox-input').is(":checked");

        // // Toggle the visibility
        // column.visible( ! isChecked );


        var checkDiv = $(this);
        
        setTimeout( function(){
            
            var column = table.column( checkDiv.attr('data-column') + ':name' );
            var isChecked = checkDiv.find('.mat-checkbox-input').is(":checked");
            
            // Toggle the visibility
            column.visible( isChecked );
        }, 1000 );
      });
      
     
          // Setup - add a text input to each footer cell
   /*   $('#example tfoot th').each( function () {
          if($(this).attr('id') != '_id'){
           var title = $(this).text();
           $(this).html( '<input type="text" placeholder="'+title+'" />' );
          }       
      } );

    // Apply the search
    table.columns().every( function () {

        var that = this;
        //$('body').on('keyup change', 'input', function(){
        $( 'input', this.footer() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
            that
            .search( this.value )
            .draw();
          }
        });
      });
*/
          $('#search_filter').click(function(e){
            let search_season = $("#season_drop").find(".mat-select-value-text").find("span").html();
            let search_scope = $("#scope_drop").find(".mat-select-value-text").find("span").html();
            let search_league = $("#league_drop").find(".mat-select-value-text").find("span").html();
           
            if(search_scope){
              localStorage.setItem('search_scope', search_scope); 
            }
            if(search_season){
              localStorage.setItem('search_season', search_season); 
            }
            if(search_league){
              localStorage.setItem('search_league', search_league); 
            }
          
            window.location.reload();

          });    

          });
      
},5000);
    });

    
  }
  
  
  
}
