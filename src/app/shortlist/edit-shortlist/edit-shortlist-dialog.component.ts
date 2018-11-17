import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Editshortlist }    from './editshortlist';
import { ShortlistService } from '../../core/services/shortlist.service';
// openDialogWithAResult
@Component({
  selector: 'edit-shortlist-dialog',
  templateUrl: './edit-shortlist-dialog.component.html',
  providers: [LayoutService,ShortlistService],
})
export class EditShortlistDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<EditShortlistDialogComponent>,private layoutService: LayoutService,private shortlistService: ShortlistService) {

  	   }

 selectedValue;
 shortlist_name = '';
 shortlists_name = '';
 task_id='';
 modaltype="edit";
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
 
  
model = new Editshortlist('Test', 'Test');
 
ngOnInit(): void {
  console.log(this.dialogRef.componentInstance);
this.model = new Editshortlist(this.dialogRef.componentInstance.shortlist_name, this.dialogRef.componentInstance.shortlist_desc);
//   /* code to get url parameter */
//   this.layoutService.updatePreloaderState('active');
//   $("#shortListDataTableLoading").show();
//   this.shortlistService.getShortlist().then(players => {
//       this.shortlists=players;
     
// $(".callouttoken").hide();
//         $("#shortListDataTableLoading").hide();
//         this.layoutService.updatePreloaderState('hide');
//       this.shortlistKeys = [];
//       if(this.shortlists.length > 0){
//         this.shortlistKeys = Object.keys(this.shortlists[0]);
//         this.shortlistKeys.shift();
//         if (typeof  this.shortlistKeys[0] != 'undefined' && this.shortlistKeys[0] == '1'){
//             this.shortlistKeys.shift();
//         }
//       }
//        // console.log(this.shortlists);
//        // console.log(new Date(Date.now()).toISOString());
//        //  console.log(this.shortlistKeys);
//     });
    
  }

  submitted = false;
 
  onSubmit() { 
  	 let shortlistData=[];
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                shortlistData.push({                  
                  "shortlist_name": this.model.shortlist_name,
                  "description": this.model.shortlist_desc,
                  "user_id": userData.userId,
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
      
    this.shortlistService.updateShortList(shortlistData[0],this.dialogRef.componentInstance.task_id)
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
  	// console.log(this.model);

   }
 
  newEditshortlist() {
    this.model = new Editshortlist('', '');
  }

}
