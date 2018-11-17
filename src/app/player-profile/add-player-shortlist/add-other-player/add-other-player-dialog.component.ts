import { Component, OnInit,ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { LayoutService } from '../../../layout/layout.service'; 
import { Createshortlist }    from './createshortlist';
import { ShortlistService } from '../../../core/services/shortlist.service';
import { PlayersService } from '../../../core/services/players.service';
// openDialogWithAResult
@Component({
  selector: 'add-other-player-dialog',
  templateUrl: './add-other-player-dialog.component.html',
  providers: [LayoutService,ShortlistService,PlayersService],
})
export class AddOtherPlayerDialogComponent implements OnInit {

  rootNode : any;
  constructor(public dialogRef: MdDialogRef<AddOtherPlayerDialogComponent>,private route: ActivatedRoute,
   private layoutService: LayoutService,private shortlistService: ShortlistService, private playersService: PlayersService,rootNode: ElementRef) {
     this.rootNode = rootNode;
  	   }

 selectedValue;
 shortlist_name = '';
 players_name = '';
 players:any;
 shortlist_id:any;
 public s_val:any;
 public hello:any;
responseStatus:Object= [];
 // this.modaltype=this.dialogRef.componentInstance.modaltype;
 public userData;
  public usertype ;

  /**
   * Submit the new shortlist create form.
   * @method submit
   */
 
  
model = new Createshortlist('','');
 
  submitted = false;
 
ngOnInit(): void {
 //  let s_id=0;
 // this.route.params.subscribe((params: Params) => {
 //        let s_id = params.s_id;
 //        this.s_val=s_id;

 //    });
   // console.log('s_id==='+this.s_val);debugger;
  this.playersService.getPlayers().then(players => {
      this.players=players['getListWithDetail'];
      // console.log('players=');
      // console.log(players);
    });
}

onSubmitAddedOtherPlayerExistShortlist() {

  // console.log("Testtt=="+test);
 let instance = this.dialogRef.componentInstance;
       // console.log(instance.shortlist_id);
   let Players = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');
    
          
                Players.push({
                  "user_id": userData.userId,
                  "player_id": this.selectedValue,
                   "created_on": new Date(Date.now()).toISOString(),
                });          
       
       
    this.playersService.addInShortlist(Players,instance.shortlist_id)
      .then(res => {
    $(".callouttoken").hide();
    $("#shortlistSuccess").show();
    this.layoutService.updatePreloaderState('hide');
    this.dialogRef.close();
    window.location.reload();
      });
       
}
 
  newCreateshortlist() {
    this.model = new Createshortlist('','');
  }

}
