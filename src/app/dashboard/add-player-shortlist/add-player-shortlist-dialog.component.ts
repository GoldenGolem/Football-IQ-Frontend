import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Createshortlist }    from './createshortlist';
import { ShortlistService } from '../../core/services/shortlist.service';
import { PlayersService } from '../../core/services/players.service';
import {AppSettings} from '../../core/constant';

// openDialogWithAResult
@Component({
  selector: 'add-player-shortlist-dialog',
  templateUrl: './add-player-shortlist-dialog.component.html',
  providers: [LayoutService,ShortlistService,PlayersService],
})
export class AddPlayerShortlistDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<AddPlayerShortlistDialogComponent>,private layoutService: LayoutService,private shortlistService: ShortlistService, private playersService: PlayersService,public snackBar: MdSnackBar) {

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
  
model = new Createshortlist('', '');
 
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

onSubmitAddedExistShortlist() {
  // console.log("Testtt=="+this.selectedValue);
   let shortlistPlayers = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
     let ischecked=0;
        $('.dataTable').find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
         ischecked=1;
            if(playerIdSelected > 1){
                shortlistPlayers.push({
                  "user_id": userData.userId,
                  "player_id": playerIdSelected,
                   "created_on": new Date(Date.now()).toISOString(),
                });
            }
        });
       if(ischecked==1) {
          this.playersService.addInShortlist(shortlistPlayers,this.selectedValue)
          .then(res => {
        
             this.openSnackBar(AppSettings.SHORTLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);    

          });
       }else{
          this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
       }
}

  onSubmit() { 
  	 let shortlistData = [];
      let shortlistPlayers = [];
      let ischecked=0;
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                shortlistData.push({
                  "user_id": userData.userId,
                  "shortlist_name": this.model.shortlist_name,
                  "description": this.model.shortlist_desc,
                   "created_on": new Date(Date.now()).toISOString(),
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
        $('.dataTable').find('input[type="checkbox"]:checked').each(function () {
           let playerIdSelected = $(this).val();
          ischecked=1;
            if(playerIdSelected > 1){
                shortlistPlayers.push({
                  "user_id": userData.userId,
                  "player_id": playerIdSelected,
                   "created_on": new Date(Date.now()).toISOString(),
                });
            }
        });

       if(ischecked==1) {
  this.hello= this.shortlistService.createShortListWhenAddPlayer(shortlistData)
      .subscribe(
           data => {
             
        let userData = JSON.parse(localStorage.getItem('userdata'));
        this.layoutService.updatePreloaderState('active');
       
        this.playersService.addInShortlist(shortlistPlayers, data[0].id)
      .then(res => {
          this.openSnackBar(AppSettings.SHORTLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);  
      });
           },
           err => console.log(err),
           () => console.log('Request Completed')
        ); 


     }else{
       this.openSnackBar(AppSettings.NO_PLAYER_SELECTED,AppSettings.SNACK_BAR_ACTION);
    }

   }
 
  newCreateshortlist() {
    this.model = new Createshortlist('', '');
  }

}
