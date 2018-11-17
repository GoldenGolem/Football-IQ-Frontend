import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Createtarget }    from './createtarget';
import { TargetService } from '../../core/services/target.service';
// openDialogWithAResult
@Component({
  selector: 'add-target-dialog',
  templateUrl: './add-target-dialog.component.html',
  providers: [LayoutService,TargetService],
})
export class AddTargetDialogComponent {
  constructor(public dialogRef: MdDialogRef<AddTargetDialogComponent>,private layoutService: LayoutService,private targetService: TargetService) {

  	   }

 selectedValue;
 modaltype="create";
 target_name = '';
 targets_name = '';
 // this.modaltype=this.dialogRef.componentInstance.modaltype;
 public userData;
  public usertype ;
 target_desc = '';
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  /**
   * Submit the new target create form.
   * @method submit
   */
  public newListSubmit() {
    // get email and password values
    // return false;
    console.log(this.target_name);
    console.log(this.target_desc);

  
  }
  
model = new Createtarget('', '');
 
  submitted = false;
 
  onSubmit() { 
  	 let targetData = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                targetData.push({
                  "user_id": userData.userId,
                  "target_name": this.model.target_name,
                  "description": this.model.target_desc,
                   "created_on": new Date(Date.now()).toISOString(),
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
      
    this.targetService.createTarget(targetData)
      .then(res => {
      	console.log(res);
		$(".callouttoken").hide();
		$("#targetSuccess").show();
		this.layoutService.updatePreloaderState('hide');
		 window.location.reload();
		// this.dialogRef.close();
		// $("#targeting tbody").append(`<tr>
        
  //           <td class="mdl-data-table__cell--non-numeric">`+this.model.target_name+`
               
  //             </td><td class="mdl-data-table__cell--non-numeric">
  //             `+this.model.target_desc+`
  //             </td><td class="mdl-data-table__cell--non-numeric">
  //               59908c9ca4a7060011fa42e1
  //             </td><td class="mdl-data-table__cell--non-numeric">
  //               2017-09-07T18:52:16.482Z
  //             </td><td class="mdl-data-table__cell--non-numeric"><a (click)="editTarget(item)">Edit</a> | <a>Delete</a></td>
  //           </tr>`);
      });
  	this.submitted = true;
  	console.log(this.model);

   }
 
  newCreatetarget() {
    this.model = new Createtarget('', '');
  }

}
