import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import { LayoutService } from '../layout/layout.service'; 
import { MdSnackBar, MdDialog } from '@angular/material';
//import { Player } from '../core/models/player';
 import { TargetService } from '../core/services/target.service';
import { AddTargetDialogComponent } from './add-target/add-target-dialog.component';
import { EditTargetDialogComponent } from './edit-target/edit-target-dialog.component';


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
  templateUrl: './target.component.html',
   providers: [TargetService],
   styleUrls: [
        // "../../../node_modules/datatables.net-dt/css/jquery.dataTables.css",
        // "../../../node_modules/datatables.net-buttons-dt/css/buttons.dataTables.css",
        // "../../../node_modules/bootstrap/dist/css/bootstrap.css",
        // "../../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
        // "../../../node_modules/datatables.net-select-bs/css/select.bootstrap.css"
    ],
    // encapsulation: ViewEncapsulation.None, 
})
export class TargetComponent implements OnInit{

  /**
  * Load External JS files from CDN
  **/



  players: any;
  targets:any;
  targetKeys: string[];
  rootNode : any;
  edittype : any;
 
  public userData;
  public usertype ;
  // public edittype='';

  constructor(
    private targetService: TargetService,
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
  openDialogWithACreateTargetForm() {
    const dialogRef = this.dialog.open(AddTargetDialogComponent);
     let instance = dialogRef.componentInstance;
    instance.modaltype = "create";
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }

  ngOnInit(): void {
	/* code to get url parameter */
  this.layoutService.updatePreloaderState('active');
  $("#shortListDataTableLoading").show();
	this.targetService.getTarget().then(players => {
      this.targets=players;
     
$(".callouttoken").hide();
        $("#shortListDataTableLoading").hide();
        this.layoutService.updatePreloaderState('hide');
      this.targetKeys = [];
      if(this.targets.length > 0){
        this.targetKeys = Object.keys(this.targets[0]);
        this.targetKeys.shift();
        if (typeof  this.targetKeys[0] != 'undefined' && this.targetKeys[0] == '1'){
            this.targetKeys.shift();
        }
      }
       // console.log(this.targets);
       // console.log(new Date(Date.now()).toISOString());
       //  console.log(this.targetKeys);
    });
    
  }

  deleteTarget(task){
    console.log(task.id);
    if(confirm("Are you sure you want to delete this target? ")) {
       let shortListData = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
    shortListData.push({
                  "user_id": userData.userId,
                  "task_id": task.id
                });
    this.targetService.removeTarget(task.id)
      .then(res => {
        $(".callouttoken").hide();
        $("#watchlistRemove").show();
        this.layoutService.updatePreloaderState('hide');
        window.location.reload();
      });
    console.log("Implement delete functionality here");
  }
  }

 editTarget(task){
    console.log(task.id);
    // this.edittype=1;
    const dialogRef = this.dialog.open(EditTargetDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.task_id = task.id;
    instance.target_name = task.target_name;
    instance.target_desc = task.description;
    // console.log('dialogRef',dialogRef);
   let result="test";
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOption = result;
    });
  }    
   
}
