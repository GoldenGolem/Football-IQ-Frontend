import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Edittarget }    from './edittarget';
import { TargetService } from '../../core/services/target.service';
// openDialogWithAResult
@Component({
  selector: 'edit-target-dialog',
  templateUrl: './edit-target-dialog.component.html',
  providers: [LayoutService,TargetService],
})
export class EditTargetDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<EditTargetDialogComponent>,private layoutService: LayoutService,private targetService: TargetService) {

  	   }

 selectedValue;
 target_name = '';
 targets_name = '';
 task_id='';
 modaltype="edit";
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
 
  
model = new Edittarget('Test', 'Test');
 
ngOnInit(): void {
  console.log(this.dialogRef.componentInstance);
this.model = new Edittarget(this.dialogRef.componentInstance.target_name, this.dialogRef.componentInstance.target_desc);
//   /* code to get url parameter */
//   this.layoutService.updatePreloaderState('active');
//   $("#shortListDataTableLoading").show();
//   this.targetService.getTarget().then(players => {
//       this.targets=players;
     
// $(".callouttoken").hide();
//         $("#shortListDataTableLoading").hide();
//         this.layoutService.updatePreloaderState('hide');
//       this.targetKeys = [];
//       if(this.targets.length > 0){
//         this.targetKeys = Object.keys(this.targets[0]);
//         this.targetKeys.shift();
//         if (typeof  this.targetKeys[0] != 'undefined' && this.targetKeys[0] == '1'){
//             this.targetKeys.shift();
//         }
//       }
//        // console.log(this.targets);
//        // console.log(new Date(Date.now()).toISOString());
//        //  console.log(this.targetKeys);
//     });
    
  }

  submitted = false;
 
  onSubmit() { 
  	 let targetData=[];
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                targetData.push({                  
                  "target_name": this.model.target_name,
                  "description": this.model.target_desc,
                  "user_id": userData.userId,
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
      
    this.targetService.updateTarget(targetData[0],this.dialogRef.componentInstance.task_id)
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
  	// console.log(this.model);

   }
 
  newEdittarget() {
    this.model = new Edittarget('', '');
  }

}
