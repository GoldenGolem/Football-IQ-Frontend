import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { LayoutService } from '../../layout/layout.service'; 
import { Createshortlist }    from './createshortlist';
import { ShortlistService } from '../../core/services/shortlist.service';
import { PlayersService } from '../../core/services/players.service';
import {AppSettings} from '../../core/constant';
import { ActivatedRoute, Params } from '@angular/router';
// openDialogWithAResult
@Component({
  selector: 'add-player-shortlist-dialog',
  templateUrl: './add-player-shortlist-by-profile-dialog.component.html',
  providers: [LayoutService,ShortlistService,PlayersService],
})
export class AddPlayerShortlistByProfileDialogComponent implements OnInit {
  constructor(private route: ActivatedRoute,public dialogRef: MdDialogRef<AddPlayerShortlistByProfileDialogComponent>,private layoutService: LayoutService,private shortlistService: ShortlistService, private playersService: PlayersService,public snackBar: MdSnackBar) {
     
  	   }

 selectedValue;
 shortlist_name = '';
 shortlists_name = '';
 shortlists:any;
 isAddShortList:any;
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
  // console.log();
   let shortlistPlayers = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
   
                shortlistPlayers.push({
                  "user_id": userData.userId,
                  "player_id": this.dialogRef.componentInstance.hello,
                   "created_on": new Date(Date.now()).toISOString(),
                });
          
     
    this.playersService.addInShortlist(shortlistPlayers,this.selectedValue)
      .then(res => {
    this.isAddShortList=1;
   this.openSnackBar(AppSettings.SHORTLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);    

      });
       
}

  onSubmit() { 
  	 let shortlistData = [];
      let shortlistPlayers = [];
  
        let userData = JSON.parse(localStorage.getItem('userdata'));
		this.layoutService.updatePreloaderState('active');
        
                shortlistData.push({
                  "user_id": userData.userId,
                  "shortlist_name": this.model.shortlist_name,
                  "description": this.model.shortlist_desc,
                   "created_on": new Date(Date.now()).toISOString(),
  					"last_updated_on": new Date(Date.now()).toISOString()
                });
       
       
                shortlistPlayers.push({
                  "user_id": userData.userId,
                  "player_id": this.dialogRef.componentInstance.hello,
                   "created_on": new Date(Date.now()).toISOString(),
                });
          
      
  this.hello= this.shortlistService.createShortListWhenAddPlayer(shortlistData)
      .subscribe(
           data => {
             
        let userData = JSON.parse(localStorage.getItem('userdata'));
        this.layoutService.updatePreloaderState('active');
       
        this.playersService.addInShortlist(shortlistPlayers, data[0].id)
      .then(res => {
         this.isAddShortList=1;
          this.openSnackBar(AppSettings.SHORTLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);  
      });
           },
           err => console.log(err),
           () => console.log('Request Completed')
        ); 


    
   }
 
  newCreateshortlist() {
    this.model = new Createshortlist('', '');
  }

}
