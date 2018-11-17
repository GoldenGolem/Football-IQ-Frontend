import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import { LayoutService } from '../layout/layout.service'; 
import { UsermanagmentService } from '../core/services/usermanagment.service';
import { Router, NavigationEnd } from '@angular/router';

var $ = require('jquery');
var jQuery = require('jquery');
var dt = require('datatables.net');
// import * as yadcf from 'yadcf';

//import { Player } from '../core/models/player';




@Component({
  selector: 'my-table-responsive',
  templateUrl: './user-managment.component.html',
   providers: [UsermanagmentService],
   styleUrls: [
        "../../../node_modules/datatables.net-dt/css/jquery.dataTables.css",
        "../../../node_modules/datatables.net-buttons-dt/css/buttons.dataTables.css",
        "../../../node_modules/bootstrap/dist/css/bootstrap.css",
        "../../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css",
        "../../../node_modules/datatables.net-select-bs/css/select.bootstrap.css"
    ],
     encapsulation: ViewEncapsulation.None 
})
export class UserManagmentComponent implements OnInit{

  /**
  * Load External JS files from CDN
  **/



  
  userKeys: string[];
  rootNode : any;
   userlists:any;
   users:any;
  public userData;
  public usertype ;
  public utype;
  // public edittype='';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  private layoutService: LayoutService,
    rootNode: ElementRef,
  private usermanagmentService: UsermanagmentService,
   private router: Router
  ) {

    this.rootNode = rootNode;
  }


  

  ngOnInit(): void {
	/* code to get url parameter */
  let userData = JSON.parse(localStorage.getItem('userdata'));
  this.utype=userData.user.realm;
  if(userData.user.realm=='manager') {
  this.layoutService.updatePreloaderState('active');
        $("#shortListDataTableLoading").hide();
        this.layoutService.updatePreloaderState('hide');
       this.usermanagmentService.getUsersList()
      .then(users => {
        this.userlists=users;
        $(".callouttoken").hide();
        $("#shortListDataTableLoading").hide();
        this.layoutService.updatePreloaderState('hide');
        this.userKeys = [];    
      });
    } 

    // Initialize Datatable

     $(this.rootNode.nativeElement).ready(function() {
              //this.columnNames = window["columnNames"] ;
              //console.log(this.columnNames);
setTimeout(function(){
  console.log('here in dt');
  let table =  $('#userListing').DataTable( {
                                  "pagingType": "first_last_numbers",
                                  "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                                  "dom": 'frtipl'             
                                  // "searching": true
                                });

  $("#examplePaginate").append($(".dataTables_paginate"));
          $("#examplePageLength").append($(".dataTables_length"));
          $("#dataTableInfo").append($(".dataTables_info"));

},5000);
                  

                       // Setup - add a text input to each footer cell
                // $('#userListing tfoot th').each( function () {
                //     if($(this).attr('id') != '_id'){
                //      var title = $(this).text();
                //      $(this).html( '<input type="text" placeholder="'+title+'" />' );
                //     }       
                // } );

              // Apply the search
              /*table.columns().every( function () {

                  var that = this;
                  //$('body').on('keyup change', 'input', function(){
                  $( 'input', this.footer() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                      that
                      .search( this.value )
                      .draw();
                    }
                  });
                });*/
            
            
           
  
  });
    
  }



  clickDashboard(userdeatil){
    let userData = JSON.parse(localStorage.getItem('userdata'));
    if(userData.user.realm=='manager'){
      userData.adminId=userData.userId;
      userData.userId=userdeatil.id;
      userData.user.id=userdeatil.id;
      userData.adminName=userData.user.username;
      userData.user.username=userdeatil.username;
      userData.user.email=userdeatil.email;
      userData.user.realm='user';
      userData.isAdmin=true;


      localStorage.setItem('userdata',JSON.stringify(userData));
       this.router.navigate(['/home']);
      window.location.reload();


    }
  }
}
