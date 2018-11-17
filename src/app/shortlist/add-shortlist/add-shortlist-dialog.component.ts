import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Createshortlist }    from './createshortlist';
import { ShortlistService } from '../../core/services/shortlist.service';
// openDialogWithAResult
@Component({
  selector: 'add-shortlist-dialog',
  templateUrl: './add-shortlist-dialog.component.html',
  providers: [LayoutService,ShortlistService],
})
export class AddShortlistDialogComponent {
  constructor(public dialogRef: MdDialogRef<AddShortlistDialogComponent>,private layoutService: LayoutService,private shortlistService: ShortlistService) {

  	   }

 selectedValue;
 modaltype="create";
 shortlist_name = '';
 shortlists_name = '';
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
  
model = new Createshortlist('', '');
 
  submitted = false;
 
  onSubmit() { 
  	 let shortlistData = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                shortlistData.push({
                  "user_id": userData.userId,
                  "shortlist_name": this.model.shortlist_name,
                  "description": this.model.shortlist_desc,
                   "created_on": new Date(Date.now()).toISOString(),
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
      
    this.shortlistService.createShortList(shortlistData)
      .then(res => {
      	console.log(res);
		$(".callouttoken").hide();
		$("#shortlistSuccess").show();
		this.layoutService.updatePreloaderState('hide');
		 window.location.reload();
		// this.dialogRef.close();
		// $("#shortlisting tbody").append(`<tr>
        
  //           <td class="mdl-data-table__cell--non-numeric">`+this.model.shortlist_name+`
               
  //             </td><td class="mdl-data-table__cell--non-numeric">
  //             `+this.model.shortlist_desc+`
  //             </td><td class="mdl-data-table__cell--non-numeric">
  //               59908c9ca4a7060011fa42e1
  //             </td><td class="mdl-data-table__cell--non-numeric">
  //               2017-09-07T18:52:16.482Z
  //             </td><td class="mdl-data-table__cell--non-numeric"><a (click)="editShortList(item)">Edit</a> | <a>Delete</a></td>
  //           </tr>`);
      });
  	this.submitted = true;
  	console.log(this.model);

   }
 
  newCreateshortlist() {
    this.model = new Createshortlist('', '');
  }

}
