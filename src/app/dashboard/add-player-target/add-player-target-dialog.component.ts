import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Createtarget }    from './createtarget';
import { TargetService } from '../../core/services/target.service';
import { PlayersService } from '../../core/services/players.service';
import {AppSettings} from '../../core/constant';

// openDialogWithAResult
@Component({
  selector: 'add-player-target-dialog',
  templateUrl: './add-player-target-dialog.component.html',
  providers: [LayoutService,TargetService,PlayersService],
})
export class AddPlayerTargetDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<AddPlayerTargetDialogComponent>,private layoutService: LayoutService,private targetService: TargetService, private playersService: PlayersService,public snackBar: MdSnackBar) {

  	   }

 selectedValue;
 target_name = '';
 targets_name = '';
 targets:any;
 public hello:any;
responseStatus:Object= [];
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
 
ngOnInit(): void {

  this.targetService.getTarget().then(players => {
      this.targets=players;
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

onSubmitAddedExistTarget() {
  // console.log("Testtt=="+this.selectedValue);
   let targetPlayers = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
     let ischecked=0;
        $('.dataTable').find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
         ischecked=1;
            if(playerIdSelected > 1){
                targetPlayers.push({
                  "user_id": userData.userId,
                  "player_id": playerIdSelected,
                   "created_on": new Date(Date.now()).toISOString(),
                });
            }
        });
       if(ischecked==1) {
    this.playersService.addInTarget(targetPlayers,this.selectedValue)
      .then(res => {
    this.openSnackBar(AppSettings.TARGET_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);    

      });
       }else{
      this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
    }
}

  onSubmit() { 
  	 let targetData = [];
      let targetPlayers = [];
       let ischecked=0;
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                targetData.push({
                  "user_id": userData.userId,
                  "target_name": this.model.target_name,
                  "description": this.model.target_desc,
                   "created_on": new Date(Date.now()).toISOString(),
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
             $('.dataTable').find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
          ischecked=1;
            if(playerIdSelected > 1){
                targetPlayers.push({
                  "user_id": userData.userId,
                  "player_id": playerIdSelected,
                   "created_on": new Date(Date.now()).toISOString(),
                });
            }
        });

         if(ischecked==1) {     
  this.targetService.createTargetWhenAddPlayer(targetData)
      .subscribe(
           data => {
             
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
       
             console.log(this.responseStatus = data[0].id)
              this.playersService.addInTarget(targetPlayers, data[0].id)
      .then(res => {
   this.openSnackBar(AppSettings.TARGET_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);  
      });
           },
           err => console.log(err),
           () => console.log('Request Completed')
        ); 
        // this
  

     }else{
        this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
    }
   }
 
  newCreatetarget() {
    this.model = new Createtarget('', '');
  }

}
