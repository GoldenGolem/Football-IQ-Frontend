import { Component, OnInit} from '@angular/core';
import {  CurrencyPipe }                 from '@angular/common';
import { APPCONFIG } from '../config';
import { LayoutService } from '../layout/layout.service';
import { DashboardService } from '../core/services/dashboard.service';


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
    providers: [DashboardService],
   styleUrls: []
})
export class HomeComponent implements OnInit{
public AppConfig: any;
public userData: any;
public dashboardList: any;
public watchLists: any;
public shortLists: any;
public targetLists: any;
  constructor(
    private dashboardService: DashboardService,  
	private layoutService: LayoutService,
  
  ) {

  }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
    this.userData = JSON.parse(localStorage.getItem('userdata'));
     
    this.dashboardService.getDashboardList().then(dashboardList => {
             
             this.dashboardList=dashboardList;
             this.watchLists=dashboardList.watchlists;
             this.shortLists=dashboardList.shortlistPlayers;
             this.targetLists=dashboardList.targetPlayers;
     });
  }
}
