import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Createviewlist }    from './createviewlist';
import { ShortlistService } from '../../core/services/shortlist.service';
import { PlayersService } from '../../core/services/players.service';
import {AppSettings} from '../../core/constant';
// openDialogWithAResult
@Component({
  selector: 'add-view-dialog',
  templateUrl: './add-view-dialog.component.html',
  providers: [LayoutService,ShortlistService,PlayersService],
})
export class AddViewDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<AddViewDialogComponent>,private layoutService: LayoutService,private shortlistService: ShortlistService, private playersService: PlayersService,public snackBar: MdSnackBar) {

  	   }

 selectedValue;
 shortlist_name = '';
 shortlists_name = '';
 shortlists:any;
 public hello:any;
responseStatus:Object= [];
 // this.modaltype=this.dialogRef.componentInstance.modaltype;
 public userData;
  public usertype ;
 shortlist_desc = '';
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  /**
   * Submit the new shortlist create form.
   * @method submit
   */
  public newListSubmit() {
    // get email and password values
    // return false;
    console.log(this.shortlist_name);
    console.log(this.shortlist_desc);

  
  }
  
//model : any;// = new Createviewlist('');
model = new Createviewlist('');
 
submitted = false;
 
ngOnInit(): void {
 
  this.shortlistService.getShortlist().then(players => {
      this.shortlists=players;
      console.log(players);
    });
}

openSnackBar(message: string, action: string) {
    this.layoutService.updatePreloaderState('hide');
    this.dialogRef.close();
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }



  onSubmit() { 
    
	let viewlist = [];
	let viewlistdata = [];
   
	let userData = JSON.parse(localStorage.getItem('userdata'));
	this.layoutService.updatePreloaderState('active');
	let table = window['table'];
	let ischecked=0;
	$('md-checkbox.toggle-vis').each(function(){
	var checkDiv = $(this);
	 var column = table.column( checkDiv.attr('data-column') + ':name' );
	 var isChecked = checkDiv.find('.mat-checkbox-input').is(":checked");
	 if(isChecked){
		viewlist.push(checkDiv.attr('data-column'));
		//viewlist[] = checkDiv.attr('data-column');
		ischecked= 1;
	 }
	 
	 //console.log(viewliststring);
	})
	
	var viewliststring = viewlist.join();
	viewlistdata.push({
	  "view_name": this.model.view_name,
	  "view_columns": viewliststring,
    });
	console.log(viewliststring);
	 if(ischecked==1) {
    this.playersService.addInViewlist(viewlistdata)
      .then(res => {
    
			this.openSnackBar(AppSettings.VIEWLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);    

      });
       }else{
		this.openSnackBar(AppSettings.NO_FILTER_SELECTED,AppSettings.SNACK_BAR_ACTION);
    }
  
   }
 


}
