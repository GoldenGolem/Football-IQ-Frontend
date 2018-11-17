import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import { LayoutService } from '../layout/layout.service'; 
import { MdSnackBar, MdDialog } from '@angular/material';
//import { Player } from '../core/models/player';
 import { ShortlistService } from '../core/services/shortlist.service';
import { AddShortlistDialogComponent } from './add-shortlist/add-shortlist-dialog.component';
import { EditShortlistDialogComponent } from './edit-shortlist/edit-shortlist-dialog.component';


/*var $ = require('jquery');
var jQuery = require('jquery');
var dt = require('datatables.net');
var dtb = require('datatables.net-buttons');
var dts = require('datatables.net-select');*/

//var dtbtn = require('datatables.net-bu')
// var dtbs = require('datatables.net-bs');
// var dts = require('datatables.net-select');


@Component({
  selector: 'my-table-responsive',
  templateUrl: './shortlist.component.html',
   providers: [ShortlistService],
   styleUrls: [
        // "../../../node_modules/datatables.net-dt/css/jquery.dataTables.css",
        // "../../../node_modules/datatables.net-buttons-dt/css/buttons.dataTables.css",
        // "../../../node_modules/bootstrap/dist/css/bootstrap.css",
        // "../../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
        // "../../../node_modules/datatables.net-select-bs/css/select.bootstrap.css"
    ],
    // encapsulation: ViewEncapsulation.None, 
})
export class ShortlistComponent implements OnInit{

  /**
  * Load External JS files from CDN
  **/



  players: any;
  shortlists:any;
  shortlistKeys: string[];
  rootNode : any;
  edittype : any;
 
  public userData;
  public usertype ;
  public isAdmin ;
  // public edittype='';

  constructor(
    private shortlistService: ShortlistService,
    private route: ActivatedRoute,
    private location: Location,
	private layoutService: LayoutService,
    rootNode: ElementRef,
   public dialog: MdDialog,
  ) {

    this.rootNode = rootNode;
  }

  public redirectTo(url): void {
      window.location.href = url;
      location.reload();
  }

  
  selectedOption;
  openDialogWithACreateShortlistForm() {
    const dialogRef = this.dialog.open(AddShortlistDialogComponent);
     let instance = dialogRef.componentInstance;
    instance.modaltype = "create";
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }

  ngOnInit(): void {
	/* code to get url parameter */
  let userData = JSON.parse(localStorage.getItem('userdata'));
  this.isAdmin=userData.isAdmin;
  this.layoutService.updatePreloaderState('active');
  $("#shortListDataTableLoading").show();
	this.shortlistService.getShortlist().then(players => {
      this.shortlists=players;
     
$(".callouttoken").hide();
        $("#shortListDataTableLoading").hide();
        this.layoutService.updatePreloaderState('hide');
      this.shortlistKeys = [];
      if(this.shortlists.length > 0){
        this.shortlistKeys = Object.keys(this.shortlists[0]);
        this.shortlistKeys.shift();
        if (typeof  this.shortlistKeys[0] != 'undefined' && this.shortlistKeys[0] == '1'){
            this.shortlistKeys.shift();
        }
      }

    });
    
  }

  deleteShortList(task){
    console.log(task.id);
    if(confirm("Are you sure you want to delete this shortlist? ")) {
       let shortListData = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
    shortListData.push({
                  "user_id": userData.userId,
                  "task_id": task.id
                });
    this.shortlistService.removeShortList(task.id)
      .then(res => {

        this.layoutService.updatePreloaderState('hide');
        window.location.reload();
      });
  }
  }

 editShortList(task){
    console.log(task.id);
    // this.edittype=1;
    const dialogRef = this.dialog.open(EditShortlistDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.task_id = task.id;
    instance.shortlist_name = task.shortlist_name;
    instance.shortlist_desc = task.description;
    // console.log('dialogRef',dialogRef);
   let result="test";
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }    
   
}
