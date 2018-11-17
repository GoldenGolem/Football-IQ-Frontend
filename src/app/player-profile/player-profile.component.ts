import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params,Router} from '@angular/router';
import { Location, CurrencyPipe }                 from '@angular/common';
import { LayoutService } from '../layout/layout.service';
//import { Player } from '../core/models/player';
import { PlayersService } from '../core/services/players.service';
import { ShortlistService } from '../core/services/shortlist.service';
import {AppSettings} from '../core/constant';
import * as html2canvas from "html2canvas";
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { CHARTCONFIG } from '../charts/charts.config';
import * as jsPDF from 'jspdf';
import { MdSnackBar, MdDialog } from '@angular/material'; 
import { AddPlayerShortlistByProfileDialogComponent } from './add-player-shortlist/add-player-shortlist-by-profile-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@Component({
  selector: 'my-profile',
  templateUrl: './player-profile.component.html',
   providers: [PlayersService,ShortlistService],
   styleUrls: [ ],
     encapsulation: ViewEncapsulation.None 
})
export class PlayerProfileComponent implements OnInit{


config = CHARTCONFIG;

 

  line4 : any


  /**
  * Load External JS files from CDN
  **/

 
  
  rootNode : any;  
  public userData;
  public usertype ;


  public loadingPlayersMessage = AppSettings.LOADING_PLAYERS;
   openSnackBar(message: string, action: string) {
    this.layoutService.updatePreloaderState('hide');
    $('input[type="checkbox"]').prop('checked', false);
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  constructor(
    private playersService: PlayersService,
    private shortlistService: ShortlistService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
	private layoutService: LayoutService,
    rootNode: ElementRef,
     public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {

    this.rootNode = rootNode;
  }

  
 selectedOption;
  openDialogWithAddPlayerInShortlistForm() {
    if(confirm(AppSettings.ADD_SHORTLIST_CONFIRM)){
      const dialogRef = this.dialog.open(AddPlayerShortlistByProfileDialogComponent);
       let instance = dialogRef.componentInstance;
       let p_id = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    p_id = params.p_id;
  });
       instance.hello=p_id;
        dialogRef.afterClosed().subscribe((result) => {
        this.selectedOption = result;
      });
    }    
  }

  openDialogLoading() {
    this.dialog.open(LoadingDialogComponent);
  }

  closeDialogLoading() {
    this.dialog.closeAll();
  }

  
   seasons : any;
   league : any;
   scope : any;
   playerProfile:any;
   playerProfileTitle:any;
   playerProfileName:any;
   birthday:any;
   nationality:any;
   height:any;
   weight:any;
   foot:any;
   primary_position:any;
   primary_position_percent:any;
   secondary_position:any;
   secondary_position_percent:any;
   third_position:any;
   third_position_percent:any;
   recently_transferred:any;
   on_loan:any;
   total_matches:any;
   minutes_on_field:any;
   minutes_per_app:any;
   n90s:any;
   at_main_cat_passing_overall:any;
   at_main_cat_offensive_overall:any;
   at_main_cat_defensive_overall:any;
   at_main_cat_duels_overall:any;
   at_main_cat_aerial_overall:any;
   at_main_cat_set_pieces_overall:any;
   partArray : any;
   attrComboArray : any;
  attrClassicAllArray : any; 
  attrClassicOverAllArray : any;  
    attrBehaviourTypeArray : any;  
  attrBehaviourCategoryArray : any;
   statisPassingArray : any;
   statisOffensiveArray : any;
  statisDefensiveArray : any;
  statisDuelsArray : any;
  statisAerialArray : any;
  statisSetpiecesArray : any;
  statisGoalkeeptingArray : any;

   seasons_player:any;
   scope_player:any;
  isAddShortList:any;
  isAddWatchList:any;
  seasonV:any;
  scopeV:any;
 line2 : any;

//  download(){
//    (function() {
//  var form = $('#exportthis'),
//     cache_width = form.width(),
//     a4 = [595.28, 990.89]; // for a4 size paper width and height

// var canvasImage,
//     winHeight = a4[1],
//     formHeight = form.height(),
//     formWidth  = form.width();

// var imagePieces = [];

// // on create pdf button click

//     $('body').scrollTop(0);
//     imagePieces = [];
//     imagePieces.length = 0;
//     main();

    
// // main code
// function main() {
//     getCanvas().then(function(canvas){
//         canvasImage = new Image();
//         canvasImage.src= canvas.toDataURL("image/png");
//         canvasImage.onload = splitImage;
//     });
// }

// // create canvas object
// function getCanvas() {
//     form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
//     return html2canvas(form, {
//         imageTimeout: 2000,
//         removeContainer: true
//     });
// }

// // chop image horizontally
// function splitImage(e) {
//     var totalImgs = Math.round(formHeight/winHeight);
//     for(var i = 0; i < totalImgs; i++) {
//         var canvas = document.createElement('canvas'),
//             ctx = canvas.getContext('2d');
//         canvas.width = formWidth;
//         canvas.height = winHeight;
//         //                    source region                   dest. region
//         ctx.drawImage(canvasImage, 0, i * winHeight, formWidth, winHeight, 0, 0, canvas.width, canvas.height);
        
//         imagePieces.push(canvas.toDataURL("image/png"));
//     }
//     console.log(imagePieces.length);
//     createPDF();
// }

// // crete pdf using chopped images
// function createPDF() {
//     var totalPieces = imagePieces.length - 1;
//     var doc = new jsPDF({
//         unit: 'px',
//         format: 'a4'
//     });
//     imagePieces.forEach(function(img){
//         doc.addImage(img, 'JPEG', 20, 40);
//         if(totalPieces)
//             doc.addPage();
//         totalPieces--;
//     });
//     doc.save('techumber-html-to-pdf.pdf');
//     form.width(cache_width);
// }


// }());
//  }

 download(){
   this.openDialogLoading();
    $("#exportthis").show(); 
   var quotes = document.getElementById('exportthis');
   // console.log(quotes);
   // debugger;
   // var quotes = $('#testt').html();
   // var quotes = document.querySelectorAll("div[hidden]");
   window['that'] = this;
 html2canvas(quotes, {
    onrendered:function(canvas) {
  
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        canvas.backgroud="#fff";
        //The height of the canvas which one pdf page can show;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //the height of canvas that haven't render to pdf
        var leftHeight = contentHeight;
        //addImage y-axial offset
        var position = 0;
        //a4 format [595.28,841.89]        
              var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;
  
        var pageData = canvas.toDataURL('image/png', 0.1);
  
        var pdf = new jsPDF('p', 'pt', 'a4');
  
       if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'PNG', 0, position, imgWidth, imgHeight,'','FAST')
                leftHeight -= pageHeight;
                position -= 841.89;
                //avoid blank page
                if(leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        $("#exportthis").hide(); 
        window['that'].closeDialogLoading();
        pdf.save('content.pdf');
        // $("#testt").hide(); 
    }
      });
   //this.closeDialogLoading();
//    (function() {
//  var
//   form = $('#exportthis'),
//   cache_width = form.width(),
//   a4 = [595.28, 841.89]; // for a4 size paper width and height

//  // $('#exportthis').on('click', function() {
//   $('body').scrollTop(0);
//   createPDF();
//  // });
//  //create pdf
//  function createPDF() {
//   getCanvas().then(function(canvas) {
//    var
//     img = canvas.toDataURL("image/png"),
//     doc = new jsPDF({
//      unit: 'px',
//      format: 'a4'
//     });
//    doc.addImage(img, 'JPEG', 20, 20);
//    doc.save('techumber-html-to-pdf.pdf');
//    form.width(cache_width);
//   });
//  }

//  // create canvas object
//  function getCanvas() {
//   form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
//   return html2canvas(form, {
//    imageTimeout: 2000,
//    removeContainer: true
//   });
//  }

// }());
 }
//     download(){
          
//             // var doc = new jsPDF()

// // const elementToPrint = document.getElementById('exportthis'); //The html element to become a pdf
// var pdf = new jsPDF('p', 'pt', 'letter');
//         // source can be HTML-formatted string, or a reference
//         // to an actual DOM element from which the text will be scraped.
//         // var source = $('#exportthis')[0];
//         var source = document.getElementById('exportthis');
// console.log(source)
//         // we support special element handlers. Register them with jQuery-style 
//         // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//         // There is no support for any other type of selectors 
//         // (class, of compound) at this time.
//         var specialElementHandlers = {
//             // element with id of "bypass" - jQuery style selector
//             '.test': function (element, renderer) {
//                 // true = "handled elsewhere, bypass text extraction"
//                 return true
//             }
//         };
//        var margins = {
//             top: 80,
//             bottom: 60,
//             left: 40,
//             width: 522
//         };
//         // all coords and widths are in jsPDF instance's declared units
//         // 'inches' in this case
//         pdf.fromHTML(
//         source, // HTML string or DOM elem ref.
//         margins.left, // x coord
//         margins.top, { // y coord
//             'width': margins.width, // max width of content on PDF
//             'elementHandlers': specialElementHandlers
//         },

//         function (dispose) {
//             // dispose: object with X, Y of the last line add to the PDF 
//             //          this allow the insertion of new lines after html
//             pdf.save('Test.pdf');
//         }, margins);
//     }

  ngOnInit(): void { 

	/* code to get url parameter */
    this.partArray =
    {
    "Started":"matches_in_start",
    "Sub In":"matches_substituted",
    "Sub Out":"matches_coming_off",
    "Matches %":"matches_played_percent",
    "Minutes %":"minutes_played_percent",
    "Win %":"win_percent"    
    };

   this.statisPassingArray =
  {
  "Assists":{"Total Assists":"assists",
        "Assists avg":"assists_avg",
        "Total Shot Assists":"shot_assists_avg",
        "Shot Assists avg":"shot_on_goal_assists_avg",
        "Successful Shot Assists %":"successful_shot_assists_percent"
        },
  "Passes":{"Passes Attempted avg":"passes_avg",
      "Successful Passes avg":"passes_avg_won",
      "Unsuccessful Passes avg":"passes_avg_lost",
      "Pass Success %":"accurate_passes_percent",
      "Passes of Team %":"passes_of_team_percent",
      "Average Pass Length":"average_pass_length"},
  "Short Passes":{"Short-Medium Passes Attempted avg":"short_medium_pass_avg",
        "Successful Short-Medium Passes avg":"short_medium_pass_avg_won",
        "Unsuccessful Short-Medium Passes avg":"short_medium_pass_avg_lost",
        "Short-Medium Passes Success %":"accurate_short_medium_pass_percent",
        "Short-Medium Passes %":"short_medium_pass_own_percentage"},
  "Long Passes":{"Long Passes Attempted avg":"long_passes_avg",
          "Successful Long Passes avg":"long_passes_won",
          "Unsuccessful Long Passes avg":"long_passes_lost",
          "Long Passes Success %":"successful_long_passes_percent",
          "Long Passes of Team %":"long_passes_of_team_percent",
          "Long Passes %":"long_passes_own_percentage",
          "Average Long Pass Length":"average_long_pass_length",},
    "Key Passes":{"Key Passes Attempted avg":"key_passes_avg",
        "Successful Key Passes avg":"key_passes_avg_won",
        "Unsuccessful Key Passes avg":"key_passes_avg_lost",
        "Key Passes Success %":"successful_key_passes_percent",
        "Key Passes %":"key_passes_own_percentage"
        },
  "Smart Passes":{"Smart Passes Attempted avg":"smart_passes_avg",
        "Successful Smart Passes avg":"smart_passes_avg_won",
        "Unsuccessful Smart Passes avg":"smart_passes_avg_lost",
        "Smart Passes Success %":"accurate_smart_passes_percent",
        "Smart Passes of Team %":"smart_passes_of_team_percent",
        "Smart Passes %":"smart_passes_own_percentage"},
  "Through Passes":{"Through Passes Attempted avg":"through_passes_avg",
          "Successful Through Passes avg":"through_passes_avg_won",
          "Unsuccessful Through Passes avg":"through_passes_avg_lost",
          "Through Passes Success %":"successful_through_passes_percent",
          "Through Passes %":"through_passes_own_percentage"},
  "Crosses":{"Crosses Attempted avg":"crosses_avg",
        "Successful Crosses avg":"crosses_avg_won",
        "Unsuccessful Crosses avg":"crosses_avg_lost",
        "Crosses Success %":"accurate_crosses_percent",
        "Crosses Wilson":"crosses_wilson",
        "Crosses %":"crosses_own_percentage"},
  "Passes to Penalty Area":{"Passes to Penalty Area Attempted avg":"pass_to_penalty_area_avg",
              "Successful Passes to Penalty Area avg":"pass_to_penalty_area_avg_won",
              "Unsuccessful Passes to Penalty Area avg":"pass_to_penalty_area_avg_lost",
              "Passes to Penalty Area Success %":"accurate_pass_to_penalty_area_percent",
              "Passes to Penalty Area %":"pass_to_penalty_area_own_percentage"},
  "Passes to Final Third":{"Passes to Final Third Attempted avg":"passes_to_final_third_avg",
              "Successful Passes to Final Third avg":"passes_to_final_third_avg_won",
              "Unsuccessful Passes to Final Third avg":"passes_to_final_third_avg_lost",
              "Passes to Final Third Success %":"accurate_passes_to_final_third_percent",
              "Passes to Final Third %":"passes_to_final_third_own_percentage"},
  "Forward Passes":{"Forward Passes Attempted avg":"forward_passes_avg",
          "Successful Forward Passes avg":"forward_passes_avg_won",
          "Unsuccessful Forward Passes avg":"forward_passes_avg_lost",
          "Forward Passes Success %":"successful_forward_passes_percent",
          "Forward Passes %":"forward_passes_own_percentage"},
  "Vertical Passes":{"Vertical Passes Attempted avg":"vertical_passes_avg",
            "Successful Vertical Passes avg":"vertical_passes_avg_won",
            "Unsuccessful Vertical Passes avg":"vertical_passes_avg_lost",
            "Vertical Success %":"successful_vertical_passes_percent",
            "Vertical Passes vs Total Passes":"vertical_passes_own_percentage"},
  "Back Passes":{"Back Passes Attempted avg":"back_passes_avg",
          "Successful Back Passes avg":"back_passes_avg_won",
          "Unsuccessful Back Passes avg":"back_passes_avg_lost",
          "Back Passes Success %":"successful_back_passes_percent",
          "Back Passes %":"back_passes_own_percentage"},
  
  
  };  

  
  this.statisOffensiveArray = {
  "Received Passes":{"Received Passes avg":"received_pass_avg",
            "Received Dangerous Passes avg":"received_dangerous_pass_avg",
            "Received Dangerous Passes %":"received_dangerous_pass_own_percentage",
            "Received Long Passes avg":"received_long_pass_avg",
            "Received Long Passes %":"received_long_pass_own_percentage",
            "Received Passes of Team %":"received_pass_of_team_percent"},
 "Attacking Actions":{"Succesfull Attacking Actions avg":"successful_attacking_actions_avg"}, 
 "Ball Entry in Final Third": {"Ball Entry in Final Third avg":"ball_entry_in_final_third_avg"},
 "Touches in Box": {"Touches in box avg":"touch_in_box_avg"},
"Caught Offside":{"Offsides avg":"offsides_avg"},
 "Accelerations": {"Accelerations avg": "accelerations_avg"},
 "Lost Balls vs Successful Attacking Actions": {"Lost balls vs SAA": "lost_balls_to_saa_percent"},
  "Linkup Plays":{"Total Linkup Plays":"linkup_plays",
          "Linkup Plays Attempted avg":"linkup_plays_avg",
          "Successful Linkup Plays avg":"linkup_plays_avg_won",
          "Unsuccessful Linkup Plays avg":"linkup_plays_avg_lost",
          "Linkup Plays Success %":"successful_linkup_plays_percent"},
  "Possession":{"Possession Losses avg":"losses_avg",
        "Own Half Possession Losses avg":"own_half_losses_avg",
        "Own Half Possession Losses%":"own_half_losses_own_percentage",
        "Dangerous Own Half Possession Losses avg":"dangerous_own_half_losses_avg",
        "Dangerous Own Half Possession Losses%":"dangerous_own_half_losses_own_percentage"},
  "Offensive Duels":{"Offensive Duels Attempted avg":"offensive_duels_avg",
            "Offensive Duels Won avg":"offensive_duels_avg_won",
            "Offensive Duels Lost avg":"offensive_duels_avg_lost",
            "Offensive Duels %":"offensive_duels_won"},
  "Dribbles":{"Dribbles Attempted avg":"dribbles_avg",
        "Successful Dribbles avg":"dribbles_avg_won",
        "Unsuccessful Dribbles avg":"dribbles_avg_lost",
        "Dribbles Success %":"successful_dribbles_percent",
        "Dribbles Wilson":"dribbles_wilson",
        "Average Dribble Distance from Opp Goal":"average_dribble_distance_from_opponent_goal"},
  "Shots":{"Total Shots":"shots",
      "Shots Attempted avg":"shots_avg",
      "Shots On Target avg":"shots_avg_on_target",
      "Shots Off Target avg":"shots_avg_off_target",
      "Shots on Target %":"shots_on_target_percent",
      "Shooting Threat":"shot_on_target_per_goal",
      "Shots Wilson":"shots_wilson"},
  "Shots to Near Corner":{"Shots Attempted Near Corner avg":"shot_to_near_corner_avg",
              "Shots On Target Near Corner avg":"shot_to_near_corner_avg_on_target",
              "Shots Off Target Near Corner avg":"shot_to_near_corner_avg_off_target",
              "Shots on Target Near Corner Success %":"shot_to_near_corner_on_target_percent",
              "Shots Near Corner %":"shot_to_near_corner_own_percentage"},
  "Shots to Far Corner":{"Shots Attempted Far Corner avg":"shot_to_far_corner_avg",
              "Shots On Target Far Corner avg":"shot_to_far_corner_avg_on_target",
              "Shots Off Target Far Corner avg":"shot_to_far_corner_avg_off_target",
              "Shots on Target Far Corner Success %":"shot_to_far_corner_on_target_percent",
              "Shots Far Corner %":"shot_to_far_corner_own_percentage"},
  "Head Shots":{"Total Head Shots":"head_shots",
        "Head Shots Attempted avg":"head_shots_avg",
        "Head Shots On Target avg":"head_shots_avg_on_target",
        "Head Shots Off Target avg":"head_shots_avg_off_target",
        "Head Shots On Target %":"head_shots_on_target_percent",
        "Head Shooting Threat":"head_shot_on_target_per_goal",
        "Head Shots %":"head_shots_own_percentage"},
  "Goals":{"Total Goals":"goals",
      "Goals avg":"goals_avg",
      "Goal Conversion %":"goal_conversion_percent",
      "Goals Wilson":"goals_wilson"},
  "Non Penalty Goals":{"Total Non Penalty Goals":"non_penalty_goal",
            "Non Penalty Goals avg":"non_penalty_goal_avg"},
  "Head Goals":{"Total Head Goals":"head_goals",
          "Head Goals avg":"head_goals_avg",
          "Head Goals Conversion %":"head_goals_conversion_percent"}
  
  };
  
  this.statisDefensiveArray = {
  "Defensive Duels":{"Defensive Duels Attempted avg":"defensive_duels_avg",
    "Defensive Duels Won avg":"defensive_duels_avg_won",
    "Defensive Duels Lost avg":"defensive_duels_avg_lost",
    "Defensive Duels %":"defensive_duels_won"},
  "Tackles":{"Tackles Attempted avg":"tackle_avg",
        "Tackles Won avg":"tackle_avg_won",
        "Tackles Lost avg":"tackle_avg_lost",
        "Tackles Success %":"successful_tackle_percent",
        "Possession Adjusted Tackles avg":"possession_adjusted_tackle",
        "Possession Adjusted Tackles %":"possession_adjusted_tackle_percentage"},
 "Clearances" : {"Clearances avg": "clearance_avg"},
 "Missed balls":{"Missed Balls avg": "missed_balls_avg"},
 "Successful Defensive Actions" :{"Successful Defensive Actions avg":"successful_defensive_actions_avg"}, 
  "Interceptions":{"Interceptions avg":"interceptions_avg",
          "Counterattack Interceptions avg":"counterattack_interception_avg",
          "Counterattack Interceptions %":"counterattack_interception_own_percentage",
          "Possession Adjusted Interceptions avg":"possession_adjusted_interceptions",
          "Possession Adjusted Interceptions %":"possession_adjusted_interceptions_own_percentage"},
  "Recoveries":{"Recoveries avg":"recoveries_avg",
        "Opponent Half Recoveries avg":"opponent_half_recoveries_avg",
        "Opponent Half Recoveries %":"opponent_half_recoveries_own_percentage",
        "Dangerous Opponent Half Recoveries avg":"dangerous_opponent_half_recoveries_avg",
        "Dangerous Opponent Half Recoveries %":"dangerous_opponent_half_recoveries_own_percentage"},
  "Shots Blocked":{"Block Shot Attempted avg":"shot_block_avg",
          "Successful Block Shot avg":"shot_block_avg_won",
          "Unsuccessful Block Shot avg":"shot_block_avg_lost",
          "Block Shot Success %":"shot_block_percent"},
  "Bookings":{"Total Yellow Cards":"yellow_cards",
        "Total Red Cards":"red_cards",
        "Total Direct Red Cards":"direct_red_cards",
        "Yellow Cards avg":"yellow_cards_avg",
        "Red Cards avg":"red_cards_avg",
        "Direct Red Cards avg":"direct_red_cards_avg",
        "Yellow Cards per Foul":"yellow_cards_per_foul"},
  "Fouls":{"Fouls avg":"fouls_avg",
        "Fouls of Team Percent":"fouls_of_team_percent"}
  };
  
  this.statisDuelsArray = {
  "Duels":{"Duels Attempted avg":"duels_avg",
      "Duels Won avg":"duels_avg_won",
      "Duels Lost avg":"duels_avg_lost",
      "Duels %":"duels_won"
      },
  "Defensive Duels":{"Defensive Duels Attempted avg":"defensive_duels_avg",
          "Defensive Duels Won avg":"defensive_duels_avg_won",
          "Defensive Duels Lost avg":"defensive_duels_avg_lost",
          "Defensive Duels %":"defensive_duels_won"},
  "Pressing Duels":{"Pressing Duels Attempted avg":"pressing_duels_avg"},  

 "Loose Ball Duels":{"Loose Ball Duels Attempted avg": "loose_ball_duels_avg"},
  "Offensive Duels":{"Offensive Duels Attempted avg":"offensive_duels_avg",
  "Offensive Duels Won avg":"offensive_duels_avg_won",
            "Offensive Duels Lost avg":"offensive_duels_avg_lost",
            "Offensive Duels %":"offensive_duels_won"},
  "Aerial Duels":{"Aerial Duels Attempted avg":"aerial_duels_avg",
          "Aerial Duels Won avg":"aerial_duels_avg_won",
          "Aerial Duels Lost avg":"aerial_duels_avg_lost",
          "Aerial Duels %":"aerial_duels_won"},
  "Field Aerial Duels":{"Field Aerial Duels Attempted avg":"field_aerial_duels_avg",
    "Field Aerial Duels Won avg":"field_aerial_duels_avg_won",
    "Field Aerial Duels Lost avg":"field_aerial_duels_avg_lost",
    "Field Aerial Duels Success %":"field_aerial_duels_won"}
  };
  
  this.statisAerialArray = { "Aerial Duels":{"Aerial Duels Attempted avg":"aerial_duels_avg",
                "Aerial Duels Won avg":"aerial_duels_avg_won",
                "Aerial Duels Lost avg":"aerial_duels_avg_lost",
                "Aerial Duels %":"aerial_duels_won"},
  "Field Aerial Duels":{"Field Aerial Duels Attempted avg":"field_aerial_duels_avg",
            "Field Aerial Duels Won avg":"field_aerial_duels_avg_won",
            "Field Aerial Duels Lost avg":"field_aerial_duels_avg_lost",
            "Field Aerial Duels Success %":"field_aerial_duels_won"},
  "Head Shots":{"Total Head Shots":"head_shots",
        "Head Shots Attempted avg":"head_shots_avg",
        "Head Shots On Target avg":"head_shots_avg_on_target",
        "Head Shots Off Target avg":"head_shots_avg_off_target",
        "Head Shots On Target %":"head_shots_on_target_percent",
        "Head Shooting Threat":"head_shot_on_target_per_goal",
        "Head Shots %":"head_shots_own_percentage"},
  "Head Goals":{"Total Head Goals":"head_goals",
          "Head Goals avg":"head_goals_avg",
          "Head Goals Conversion %":"head_goals_conversion_percent"}
  };
  
  this.statisSetpiecesArray = {
  "Freekicks":{"Freekicks avg":"free_kicks_taken_avg",
          "Freekicks of Team %":"free_kicks_of_team_percent"},
  "Direct Freekicks":{"Direct Freekicks Taken avg":"direct_free_kicks_taken_avg",
          "Direct Freekicks On Target avg":"direct_free_kicks_taken_avg_won",
          "Direct Freekicks Off Target avg":"direct_free_kicks_taken_avg_lost",
          "Direct Freekicks On Target Success %":"direct_free_kicks_on_target_percent"},
  "Corners":{"Corners Taken avg":"corners_taken_avg"},
  "Penalties":{"Total Penalties Taken":"penalties_taken",
        "Penalties Taken avg":"penalties_taken_avg",
        "Penalties Conversion %":"penalties_conversion_percent"}
  };
  
  this.statisGoalkeeptingArray = {
  "Shots Against":{"Total Shots Against":"shots_against",
          "Shots Against avg":"shots_against_avg"},
  "Saves":{"Saved Shots avg":"shots_against_saved",
      "Shots Beaten avg":"shots_against_not_saved",
      "Save Success %":"save_percent"},
  "Saves with Reflex":{"Save with Reflex avg":"save_with_reflex_avg",
          "Saved Shots with Reflex avg":"shots_against_saved_with_reflex",
          "Shots Beaten with Reflex avg":"shots_against_not_saved_with_reflex",
          "Saves with Reflex Success%":"save_with_reflex_percent",
          "Saves with Reflex %":"save_with_reflex_own_percentage",
          "Super Save avg":"super_save_avg",
          "Super Save %":"super_save_own_percentage",
          "Saves Wilson":"saves_wilson"},
 "Clean Sheets":{"Total Clean Sheets": "clean_sheets"},
  "Conceded Goals":{"Total Conceded Goals":"conceded_goals",
          "Conceded Goals avg":"conceded_goals_avg",
          "Easy Conceded Goal avg":"easy_conceded_goal_avg",
          "Easy Conceded Goals %":"easy_conceded_goal_own_percentage",
          "Far Conceded Goals avg":"far_conceded_goals_avg",
          "Far Conceded Goals %":"far_conceded_goals_own_percentage",
          "Near Conceded Goals avg":"near_conceded_goals_avg",
          "Near Conceded Goals %":"near_conceded_goals_own_percentage"},
  "GK Exits":{"Goalkeeper Exits avg":"goalkeeper_exits_avg",
        "Successful Goalkeeper Exits avg":"goalkeeper_exits_avg_won",
        "Unsuccesful Goalkeeper Exits avg":"goalkeeper_exits_avg_lost",
        "Successful Goalkeeper Exits %":"successful_goalkeeper_exits_percent"},
  "GK Claims":{"Goalkeeper Claim avg":"goalkeeper_claim_avg",
        "Goalkeeper Claim to Punch avg":"goalkeeper_claim_to_punch"},
  "GK Punch":{"Goalkeeper Punch avg":"goalkeeper_punch_avg",
        "Successful Goalkeeper Punch avg":"goalkeeper_punch_avg_won",
        "Unsuccessful Goalkeeper Punch avg":"goalkeeper_punch_avg_lost",
        "Goalkeeper Punch Accuracy %":"goalkeeper_punch_accuracy"},
  "GK Aerial Duels":{"Goalkeeper Aerial Duels avg":"gk_aerial_duels_avg",
            "Successful Goalkeeper Aerial Duels avg":"gk_aerial_duels_avg_won",
            "Unsuccessful Goalkeeper Aerial Duels avg":"gk_aerial_duels_avg_lost",
            "Goalkeeper Aerial Duels Success %":"gk_aerial_duels_won"}
  };
  
this.attrComboArray = {
  "Mentel" : { "Reliability":"at_combo_reliability"},
  "Passing" : {"Possession":"at_combo_ret_possession","Construction":"at_combo_passing_construction","Threat":"at_combo_passing_threat","Creativity":"at_combo_passing_creativity",},
  "Offensive" : {"Point of Reference":"at_combo_point_of_reference","Dangerous Positions":"at_combo_dangerous_positions","Shooting Threat":"at_combo_shooting_threat","Goal scoring":"at_combo_goalscoring","On Ball":"at_combo_ability_with_ball",},
  "Defensive" : {"vs Opponent":"at_combo_against_opponent","Space":"at_combo_covering_space","Defending Deep":"at_combo_def_deep","Workrate":"at_def_workrate",},
  "Aerial" : { "Presence": "at_combo_aerial_presence", "Threat":"at_combo_aerial_threat"}
  };
  

  this.attrClassicAllArray = {"PASSING":{"Passes":{"Overall":"at_passes_overall","Involvement":"at_passes_avg","Productivity":"at_passes_avg_won","Losses":"at_passes_avg_lost","Efficiency":"at_accurate_passes_percent"},"Assists":{"Overall":"at_assists_overall","Productivity":"at_assists_avg","Efficiency":"at_successful_shot_assists_percent"},"▬Shot  Assists":{"Involvement":"at_shot_assists_avg","Productivity":"at_shot_on_goal_assists_avg"},"Short-Medium Passes":{"Overall":"at_short_medium_pass_overall","Involvement":"at_short_medium_pass_avg","Productivity":"at_short_medium_pass_avg_won","Losses":"at_short_medium_pass_avg_lost","Efficiency":"at_accurate_short_medium_pass_percent"},"Long Passes":{"Overall":"at_long_passes_overall","Involvement":"at_long_passes_avg","Productivity":"at_long_passes_won","Losses":"at_long_passes_lost","Efficiency":"at_successful_long_passes_percent"},"Key Passes":{"Overall":"at_key_passes_overall","Involvement":"at_key_passes_avg","Productivity":"at_key_passes_avg_won","Losses":"at_key_passes_avg_lost","Efficiency":"at_successful_key_passes_percent"},"Smart Passes":{"Overall":"at_smart_passes_overall","Involvement":"at_smart_passes_avg","Productivity":"at_smart_passes_avg_won","Losses":"at_smart_passes_avg_lost","Efficiency":"at_accurate_smart_passes_percent"},"Through Passes":{"Overall":"at_through_passes_overall","Involvement":"at_through_passes_avg","Productivity":"at_through_passes_avg_won","Losses":"at_through_passes_avg_lost","Efficiency":"at_successful_through_passes_percent"},"Crosses":{"Overall":"at_crosses_overall","Involvement":"at_crosses_avg","Productivity":"at_crosses_avg_won","Losses":"at_crosses_avg_lost","Efficiency":"at_accurate_crosses_percent"},"Passes to Penalty Area":{"Overall":"at_pass_to_penalty_area_overall","Involvement":"at_pass_to_penalty_area_avg","Productivity":"at_pass_to_penalty_area_avg_won","Losses":"at_pass_to_penalty_area_avg_lost","Efficiency":"at_accurate_pass_to_penalty_area_percent"},"Passes to Final Third":{"Overall":"at_passes_to_final_third_overall","Involvement":"at_passes_to_final_third_avg","Productivity":"at_passes_to_final_third_avg_won","Losses":"at_passes_to_final_third_avg_lost","Efficiency":"at_accurate_passes_to_final_third_percent"},"Forward Passes":{"Overall":"at_forward_passes_overall","Involvement":"at_forward_passes_avg","Productivity":"at_forward_passes_avg_won","Losses":"at_forward_passes_avg_lost","Efficiency":"at_successful_forward_passes_percent"},"Vertical Passes":{"Overall":"at_vertical_passes_overall","Involvement":"at_vertical_passes_avg","Productivity":"at_vertical_passes_avg_won","Losses":"at_vertical_passes_avg_lost","Efficiency":"at_successful_vertical_passes_percent"},"Back Passes":{"Overall":"at_back_passes_overall","Involvement":"at_back_passes_avg","Productivity":"at_back_passes_avg_won","Losses":"at_back_passes_avg_lost","Efficiency":"at_successful_back_passes_percent"} },


  "OFFENSIVE":{"Successful attacking Actions":{"Productivity": "at_successful_attacking_actions_avg"}, "Received Passes":{"Overall":"at_received_pass_overall","Productivity":"at_received_pass_avg"},"▬Received Dangerous Passes":{"Productivity":"at_received_dangerous_pass_avg"},"▬Received Long Passes":{"Productivity":"at_received_long_pass_avg"},"Linkup Plays":{"Overall":"at_linkup_plays_overall","Involvement":"at_linkup_plays_avg","Productivity":"at_linkup_plays_avg_won","Losses":"at_linkup_plays_avg_lost","Efficiency":"at_successful_linkup_plays_percent"},"Touches in Box":{"Involvement":"at_touch_in_box_avg"}, "Ball Entry in Final Third":{"Productivity":"at_ball_entry_in_final_third_avg"},"Caught Offside":{"Losses":"at_offsides_avg"},"Possession Losses":{"Losses":"at_losses_avg"},"▬Own Half Losses":{"Losses":"at_own_half_losses_avg"}, "▬Dangerous Own Half  Losses":{"Losses":"at_dangerous_own_half_losses_avg"},"Accelerations":{"Productivity":"at_accelerations_avg"},"Offensive Duels":{"Overall":"at_offensive_duels_overall","Involvement":"at_offensive_duels_avg","Productivity":"at_offensive_duels_avg_won","Losses":"at_offensive_duels_avg_lost","Efficiency":"at_offensive_duels_won"},"Dribbles":{"Overall":"at_dribbles_overall","Involvement":"at_dribbles_avg","Productivity":"at_dribbles_avg_won","Losses":"at_dribbles_avg_lost","Efficiency":"at_successful_dribbles_percent"},"Shooting":{"Overall":"at_shots_overall","Involvement":"at_shots_avg","Productivity":"at_shots_avg_on_target","Losses":"at_shots_avg_off_target","Efficiency":"at_shots_on_target_percent"},"▬Shots per Goal":{"Efficiency":"at_shot_on_target_per_goal"},"Shots Near Corner":{"Overall":"at_shot_to_near_corner_overall","Involvement":"at_shot_to_near_corner_avg","Productivity":"at_shot_to_near_corner_avg_on_target","Losses":"at_shot_to_near_corner_avg_off_target","Efficiency":"at_shot_to_near_corner_on_target_percent"},"Shots Far Corner":{"Overall":"at_shot_to_far_corner_overall","Involvement":"at_shot_to_far_corner_avg","Productivity":"at_shot_to_far_corner_avg_on_target","Losses":"at_shot_to_far_corner_avg_off_target","Efficiency":"at_shot_to_far_corner_on_target_percent"},"Head Shots":{"Overall":"at_head_shots_overall","Involvement":"at_head_shots_avg","Productivity":"at_head_shots_avg_on_target","Losses":"at_head_shots_avg_off_target","Efficiency":"at_head_shots_on_target_percent"},"▬Head Shots per Goal":{"Efficiency":"head_shot_on_target_per_goal"}, "Finishing":{"Overall":"at_goals_overall","Productivity":"at_goals_avg","Efficiency":"at_goal_conversion_percent"}, "▬Heading":{"Overall":"at_head_goals_overall","Productivity":"at_head_goals_avg","Efficiency":"at_head_goals_conversion_percent"},"▬Non Penalty Goal":{"Productivity":"at_non_penalty_goal_avg"} },
  
  "DEFENSIVE":{"Successful Defensive Actions":{"Productivity":"at_successful_defensive_actions_avg"},"Defensive Duels":{"Overall":"at_defensive_duels_overall","Involvement":"at_defensive_duels_avg","Productivity":"at_defensive_duels_avg_won","Losses":"at_defensive_duels_avg_lost","Efficiency":"at_defensive_duels_won"},"Tackling":{"Overall":"at_tackle_overall","Involvement":"at_tackle_avg","Productivity":"at_tackle_avg_won","Losses":"at_tackle_avg_lost","Efficiency":"at_successful_tackle_percent"}, "▬Possession Adjusted Tackle":{"Involvement":"at_possession_adjusted_tackle"},"Interceptions":{"Overall":"at_interceptions_overall","Productivity":"at_interceptions_avg"},"▬Counterattack Interceptions":{"Productivity":"at_counterattack_interception_avg"},"▬Possession Adjusted Interceptions":{"Productivity":"at_possession_adjusted_interceptions"},"Recoveries":{"Overall":"at_recoveries_overall","Productivity":"at_recoveries_avg"},"▬Opponent Half Recoveries":{"Productivity":"at_opponent_half_recoveries_avg"},  "▬Dangerous Opponent Half Recoveries":{"Productivity":"at_dangerous_opponent_half_recoveries_avg"}, "Clearances":{"Productivity":"at_clearance_avg"}, "Missed Balls":{"Losses":"at_missed_balls_avg"},"Shot Blocking":{"Overall":"at_shot_block_overall","Involvement":"at_shot_block_avg","Productivity":"at_shot_block_avg_won","Losses":"at_shot_block_avg_lost","Efficiency":"at_shot_block_percent"}, "Fouls": {"Losses":"at_fouls_avg","Efficiency":"at_yellow_cards_per_foul"}, "Bookings":{"Overall":"at_bookings_overall"}, "▬Yellow Cards":{"Losses":"at_yellow_cards_avg"},"▬Red Cards":{"Losses":"at_red_cards_avg"}, "▬Direct Red Cards":{"Losses":"at_direct_red_cards_avg"} },
  
  
  "DUELS":{"Defensive Duels":{"Overall":"at_defensive_duels_overall","Involvement":"at_defensive_duels_avg","Productivity":"at_defensive_duels_avg_won","Losses":"at_defensive_duels_avg_lost","Efficiency":"at_defensive_duels_won"}, "Offensive Duels":{"Overall":"at_offensive_duels_overall","Involvement":"at_offensive_duels_avg","Productivity":"at_offensive_duels_avg_won","Losses":"at_offensive_duels_avg_lost","Efficiency":"at_offensive_duels_won"}, "Aerial Duels":{"Overall":"at_aerial_duels_overall","Involvement":"at_aerial_duels_avg","Productivity":"at_aerial_duels_avg_won","Losses":"at_aerial_duels_avg_lost","Efficiency":"at_aerial_duels_won"}, "Field Aerial Duels":{"Overall":"at_field_aerial_duels_overall","Involvement":"at_field_aerial_duels_avg","Productivity":"at_field_aerial_duels_avg_won","Losses":"at_field_aerial_duels_avg_lost","Efficiency":"at_field_aerial_duels_won"}, "Pressing Duels":{"Involvement":"at_pressing_duels_avg"}, "Loose Ball Duels":{"Involvement": "at_loose_ball_duels_avg"}  },

  "AERIAL":{"Aerial Duels":{"Overall":"at_aerial_duels_overall","Involvement":"at_aerial_duels_avg","Productivity":"at_aerial_duels_avg_won","Losses":"at_aerial_duels_avg_lost","Efficiency":"at_aerial_duels_won"}, "Field Aerial Duels":{"Overall":"at_field_aerial_duels_overall","Involvement":"at_field_aerial_duels_avg","Productivity":"at_field_aerial_duels_avg_won","Losses":"at_field_aerial_duels_avg_lost","Efficiency":"at_field_aerial_duels_won"}, "Head Shots":{"Overall":"at_head_shots_overall","Involvement":"at_head_shots_avg","Productivity":"at_head_shots_avg_on_target","Losses":"at_head_shots_avg_off_target","Efficiency":"at_head_shots_on_target_percent"}, "Head Goals":{"Overall":"at_head_goals_overall","Productivity":"at_head_goals_avg","Efficiency":"at_head_goals_conversion_percent"}  }, 
  
  "SET PIECES":{"Free Kicks":{"Involvement":"at_free_kicks_taken_avg"}, "Direct Free Kicks":{"Overall":"at_direct_free_kicks_taken_overall","Involvement":"at_direct_free_kicks_taken_avg","Productivity":"at_direct_free_kicks_taken_avg_won","Losses":"at_direct_free_kicks_taken_avg_lost","Efficiency":"at_direct_free_kicks_on_target_percent"},"Corners":{"Involvement":"at_corners_taken_avg"}, "Penalties":{"Overall":"at_penalties_overall","Involvement":"at_penalties_taken_avg","Efficiency":"at_penalties_conversion_percent"} }, 
  
  "GOALKEEPING":{"Saves":{"Overall":"at_shots_against_overall","Involvement":"at_shots_against_avg","Productivity":"at_shots_against_saved","Losses":"at_shots_against_not_saved","Efficiency":"at_save_percent"}, "▬Saves with Reflex":{"Overall":"at_save_with_reflex_overall","Involvement":"at_save_with_reflex_avg","Productivity":"at_shots_against_saved_with_reflex","Losses":"at_shots_against_not_saved_with_reflex","Efficiency":"at_save_with_reflex_percent"}, "▬Super Save":{"Productivity":"at_super_save_avg"}, "Conceded Goals":{"Overall":"at_conceded_goals_overall","Losses":"at_conceded_goals_avg","Efficiency":"at_clean_sheets"}, "▬Easy Conceded Goals":{"Losses":"at_easy_conceded_goal_avg"}, "▬Far Conceded Goals":{"Losses":"at_far_conceded_goals_avg"}, "▬NearConceded Goals":{"Losses":"at_near_conceded_goals_avg"}, "Control of Area": {"Overall":"at_goalkeeper_exits_overall","Involvement":"at_goalkeeper_exits_avg","Productivity":"at_goalkeeper_exits_avg_won","Losses":"at_goalkeeper_exits_avg_lost","Efficiency":"at_successful_goalkeeper_exits_percent"}, "▬Punch":{"Overall":"at_goalkeeper_punch_overall","Involvement":"at_goalkeeper_punch_avg","Productivity":"at_goalkeeper_punch_avg_won","Losses":"at_goalkeeper_punch_avg_lost","Efficiency":"at_goalkeeper_punch_accuracy"}, "▬Claim":{"Involvement":"at_goalkeeper_claim_avg"},"▬Claim to Punch": {"Involvement":"at_goalkeeper_claim_to_punch"}, "GK Aerial Duels":{"Overall":"at_gk_aerial_duels_overall","Involvement":"at_gk_aerial_duels_avg","Productivity":"at_gk_aerial_duels_avg_won","Losses":"at_gk_aerial_duels_avg_lost","Efficiency":"gk_aerial_duels_won"}, "GK Reliability":{"Overall":"at_gk_reliability_overall"}  }
  
  };
  
  
  
  
    this.attrClassicOverAllArray  = {
  "PASSING":{"Passing":"at_main_cat_passing_overall","Passes":"at_passes_overall","Assists":"at_assists_overall","Short-Medium Passes":"at_short_medium_pass_overall","Long Passes":"at_long_passes_overall","Key Passes":"at_key_passes_overall","Smart Passes":"at_smart_passes_overall","Through Passes":"at_through_passes_overall","Crosses":"at_crosses_overall","Passes to Penalty Area":"at_pass_to_penalty_area_overall","Passes to Final Third":"at_passes_to_final_third_overall","Forward Passes":"at_forward_passes_overall","Vertical Passes":"at_vertical_passes_overall","Back Passes":"at_back_passes_overall"},
  "OFFENSIVE":{"Offensive":"at_main_cat_offensive_overall","Successful attacking Actions":"at_successful_attacking_actions_avg","Received Passes":"at_received_pass_overall","Linkup Plays":"at_linkup_plays_overall","Touches in Box":"at_touch_in_box_avg","Ball Entry in Final Third":"at_ball_entry_in_final_third_avg","Caught Offside":"at_offsides_avg","Possession Losses":"at_losses_overall","Accelerations":"at_accelerations_avg","Offensive Duels":"at_offensive_duels_overall","Dribbles":"at_dribbles_overall","Shooting":"at_shots_overall","Shots Near Corner":"at_shot_to_near_corner_overall","Shots Far Corner":"at_shot_to_far_corner_overall","Head Shots":"at_head_shots_overall","Finishing":"at_goals_overall","Heading":"at_head_goals_overall"},
  "DEFENSIVE":{"Defensive":"at_main_cat_defensive_overall","Successful Defensive Actions":"at_successful_defensive_actions_avg","Defensive Duels":"at_defensive_duels_overall","Tackling":"at_tackle_overall","Interceptions":"at_interceptions_overall","Recoveries":"at_recoveries_overall","Clearances":"at_clearance_avg","Missed Balls":"at_missed_balls_avg","Shot Blocking":"at_shot_block_overall","Fouls":"at_fouls_avg","Bookings":"at_bookings_overall"},
  "DUELS":{"Duels":"at_main_cat_duels_overall","Defensive Duels":"at_defensive_duels_overall","Offensive Duels":"at_offensive_duels_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall","Pressing Duels":"at_pressing_duels_avg","Loose Ball Duels":"at_loose_ball_duels_avg"},
  "AERIAL":{"Aerial":"at_main_cat_aerial_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall","Head Shots":"at_head_shots_overall","Heading":"at_head_goals_overall"},
  "SET PIECES":{"Set Pieces":"at_main_cat_set_pieces_overall","Free Kicks":"at_free_kicks_taken_avg","Direct Free Kicks":"at_direct_free_kicks_taken_overall","Corners":"at_corners_taken_avg","Penalties":"at_penalties_overall"},
  "GOALKEEPING":{"Goalkeepting":"at_main_cat_goalkeeping_overall","Saves":"at_shots_against_overall","Reflexes":"at_save_with_reflex_overall","Conceded Goals":"at_conceded_goals_overall","Control of Area":"at_goalkeeper_exits_overall","Punch":"at_goalkeeper_punch_overall","GK Aerial Duels":"at_gk_aerial_duels_overall","GK Reliability":"at_gk_reliability_overall"}
  };
  
  
  this.attrBehaviourTypeArray = {
  "OVERALL":{"Passing":{"Passing Overall":"at_main_cat_passing_overall","Passes":"at_passes_overall","Assists":"at_assists_overall","Short-Medium Passes":"at_short_medium_pass_overall","Long Passes":"at_long_passes_overall","Key Passes":"at_key_passes_overall","Smart Passes":"at_smart_passes_overall","Through Passes":"at_through_passes_overall","Crosses":"at_crosses_overall","Passes to Penalty Area":"at_pass_to_penalty_area_overall","Passes to Final Third":"at_passes_to_final_third_overall","Forward Passes":"at_forward_passes_overall","Vertical Passes":"at_vertical_passes_overall","Back Passes":"at_back_passes_overall"}, "Offensive":{ "Offensive Overall":"at_main_cat_offensive_overall","Received Passes":"at_received_pass_overall","Linkup Plays":"at_linkup_plays_overall","Possession Losses":"at_losses_overall","Offensive Duels":"at_offensive_duels_overall","Dribbles":"at_dribbles_overall","Shooting":"at_shots_overall","Shots Near Corner":"at_shot_to_near_corner_overall","Shots Far Corner":"at_shot_to_far_corner_overall","Head Shots":"at_head_shots_overall","Finishing":"at_goals_overall","▬Heading":"at_head_goals_overall"}, "Defensive":{"Defensive Overall":"at_main_cat_defensive_overall","Defensive Duels":"at_defensive_duels_overall","Tackling":"at_tackle_overall","Interceptions":"at_interceptions_overall","Recoveries":"at_recoveries_overall","Shot Blocking":"at_shot_block_overall","Bookings":"at_bookings_overall"}, "Duels":{"Duels Overall":"at_main_cat_duels_overall","Defensive Duels":"at_defensive_duels_overall","Offensive Duels":"at_offensive_duels_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall"}, "Aerial":{"Aerial Overall":"at_main_cat_aerial_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall","Head Shots":"at_head_shots_overall","Head Goals":"at_head_goals_overall"}, "Set Pieces":{"Set Pieces Overall":"at_main_cat_set_pieces_overall","Direct Free Kicks":"at_direct_free_kicks_taken_overall","Penalties":"at_penalties_overall"}, "Goalkeeping":{"Goalkeeping Overall":"at_main_cat_goalkeeping_overall","Saves":"at_shots_against_overall","▬Saves with Reflex":"at_save_with_reflex_overall","Conceded Goals":"at_conceded_goals_overall","Control of Area":"at_goalkeeper_exits_overall","▬Punch":"at_goalkeeper_punch_overall","GK Aerial Duels":"at_gk_aerial_duels_overall","GK Reliability":"at_gk_reliability_overall"}  }, 
  
  
  "INVOLVEMENT":{ "Passing":{"Short-Medium Passes":"at_short_medium_pass_avg","Long Passes":"at_long_passes_avg","Key Passes":"at_key_passes_avg","Smart Passes":"at_smart_passes_avg","Through Passes":"at_through_passes_avg","Crosses":"at_crosses_avg","Passes to Penalty Area":"at_pass_to_penalty_area_avg","Passes to Final Third":"at_passes_to_final_third_avg","Forward Passes":"at_forward_passes_avg","Vertical Passes":"at_vertical_passes_avg","Back Passes":"at_back_passes_avg"}, "Offensive":{"Involvement Overall":"at_behavior_involvement_offensive_overall","Linkup Plays":"at_linkup_plays_avg","Touches in Box":"at_touch_in_box_avg","Offensive Duels":"at_offensive_duels_avg","Dribbles":"at_dribbles_avg","Shooting":"at_shots_avg","Shots Near Corner":"at_shot_to_near_corner_avg","Shots Far Corner":"at_shot_to_far_corner_avg","Head Shots":"at_head_shots_avg"}, "Defensive":{"Involvement Overall":"at_behavior_involvement_defensive_overall","Defensive Duels":"at_defensive_duels_avg","Tackling":"at_tackle_avg","Shot Blocking":"at_shot_block_avg"},"Duels":{"Involvement Overall":"at_behavior_involvement_duels_overall","Defensive Duels":"at_defensive_duels_avg","Offensive Duels":"at_offensive_duels_avg","Aerial Duels":"at_aerial_duels_avg","Field Aerial Duels":"at_field_aerial_duels_avg","Pressing Duels":"at_pressing_duels_avg","Loose Ball Duels":"at_loose_ball_duels_avg"}, "Aerial":{"Involvement Overall":"at_behavior_involvement_aerial_overall","Aerial Duels":"at_aerial_duels_avg","Field Aerial Duels":"at_field_aerial_duels_avg","Head Shots":"at_head_shots_avg"},"Set Pieces":{"Involvement Overall":"at_behavior_involvement_set_pieces_overall","Free Kicks":"at_free_kicks_taken_avg","Direct Free Kicks":"at_direct_free_kicks_taken_avg","Corners":"at_corners_taken_avg","Penalties":"at_penalties_taken_avg"}, "Goalkeeping":{"Involvement Overall":"at_behavior_involvement_goalkeeping_overall","Saves":"at_shots_against_avg","▬Saves with Reflex":"at_save_with_reflex_avg","Control of Area":"at_goalkeeper_exits_avg","▬Punch":"at_goalkeeper_punch_avg","▬Claim":"at_goalkeeper_claim_avg","▬Claim to Punch":"at_goalkeeper_claim_to_punch","GK Aerial Duels":"at_gk_aerial_duels_avg"}  }, 
  
  
  "PRODUCTIVITY":{"Passing":{"Productivity Overall":"at_behavior_productivity_passing_overall","Passes":"at_passes_avg_won","Assists":"at_assists_avg","▬Shot  Assists":"at_shot_on_goal_assists_avg","Short-Medium Passes":"at_short_medium_pass_avg_won","Long Passes":"at_long_passes_won","Key Passes":"at_key_passes_avg_won","Smart Passes":"at_smart_passes_avg_won","Through Passes":"at_through_passes_avg_won","Crosses":"at_crosses_avg_won","Passes to Penalty Area":"at_pass_to_penalty_area_avg_won","Passes to Final Third":"at_passes_to_final_third_avg_won","Forward Passes":"at_forward_passes_avg_won","Vertical Passes":"at_vertical_passes_avg_won","Back Passes":"at_back_passes_avg_won"}, "Offensive":{"Productivity Overall":"at_behavior_productivity_offensive_overall","Successful attacking Actions":"at_successful_attacking_actions_avg","Received Passes":"at_received_pass_avg","▬Received Dangerous Passes":"at_received_dangerous_pass_avg","▬Received Long Passes":"at_received_long_pass_avg","Linkup Plays":"at_linkup_plays_avg_won","Ball Entry in Final Third":"at_ball_entry_in_final_third_avg","Accelerations":"at_accelerations_avg","Offensive Duels":"at_offensive_duels_avg_won","Dribbles":"at_dribbles_avg_won","Shooting":"at_shots_avg_on_target","Shots Near Corner":"at_shot_to_near_corner_avg_on_target","Shots Far Corner":"at_shot_to_far_corner_avg_on_target","Head Shots":"at_head_shots_avg_on_target","Finishing":"at_goals_avg","▬Heading":"at_head_goals_avg","▬Non Penalty Goal":"at_non_penalty_goal_avg"},"Defensive":{"Productivity Overall":"at_behavior_productivity_defensive_overall","Succ Defensive Actions":"at_successful_defensive_actions_avg","Defensive Duels":"at_defensive_duels_avg_won","Tackling":"at_tackle_avg_won","Interceptions":"at_interceptions_avg","▬Counterattack Interceptions":"at_counterattack_interception_avg","▬Possession Adjusted Interceptions":"at_possession_adjusted_interceptions","Recoveries":"at_recoveries_avg","▬Opponent Half Recoveries":"at_opponent_half_recoveries_avg","▬Dangerous Opponent Half Recoveries":"at_dangerous_opponent_half_recoveries_avg","Clearances":"at_clearance_avg","Shot Blocking":"at_shot_block_avg_won"}, "Duels":{"Productivity Overall":"at_behavior_productivity_duels_overall","Defensive Duels":"at_defensive_duels_avg_won","Offensive Duels":"at_offensive_duels_avg_won","Aerial Duels":"at_aerial_duels_avg_won","Field Aerial Duels":"at_field_aerial_duels_avg_won"}, "Aerial":{"Productivity Overall":"at_behavior_productivity_aerial_overall","Aerial Duels":"at_aerial_duels_avg_won","Field Aerial Duels":"at_field_aerial_duels_avg_won","Head Shots":"at_head_shots_avg_on_target","Head Goals":"at_head_goals_avg"}, "Set Pieces":{"Direct Free Kicks":"at_direct_free_kicks_taken_avg_won"}, "Goalkeeping":{"Productivity Overall":"at_behavior_productivity_goalkeeping_overall","Saves":"at_shots_against_saved","▬Saves with Reflex":"at_shots_against_saved_with_reflex","▬Super Save":"at_super_save_avg","Control of Area":"at_goalkeeper_exits_avg_won","▬Punch":"at_goalkeeper_punch_avg_won","GK Aerial Duels":"at_gk_aerial_duels_avg_won"}   }, 
  
  
  "LOSSES":{"Passing":{"Losses Overall":"at_behavior_losses_passing_overall","Passes":"at_passes_avg_lost","Short-Medium Passes":"at_short_medium_pass_avg_lost","Long Passes":"at_long_passes_lost","Key Passes":"at_key_passes_avg_lost","Smart Passes":"at_smart_passes_avg_lost","Through Passes":"at_through_passes_avg_lost","Crosses":"at_crosses_avg_lost","Passes to Penalty Area":"at_pass_to_penalty_area_avg_lost","Passes to Final Third":"at_passes_to_final_third_avg_lost","Forward Passes":"at_forward_passes_avg_lost","Vertical Passes":"at_vertical_passes_avg_lost","Back Passes":"at_back_passes_avg_lost"}, "Offensive":{"Losses Overall":"at_behavior_losses_offensive_overall","Linkup Plays":"at_linkup_plays_avg_lost","Caught Offside":"at_offsides_avg","Possession Losses":"at_losses_avg","▬Own Half Losses":"at_own_half_losses_avg","▬Dangerous Own Half  Losses":"at_dangerous_own_half_losses_avg","Offensive Duels":"at_offensive_duels_avg_lost","Dribbles":"at_dribbles_avg_lost","Shooting":"at_shots_avg_off_target","Shots Near Corner":"at_shot_to_near_corner_avg_off_target","Shots Far Corner":"at_shot_to_far_corner_avg_off_target","Head Shots":"at_head_shots_avg_off_target"}, "Defensive":{"Losses Overall":"at_behavior_losses_defensive_overall","Defensive Duels":"at_defensive_duels_avg_lost","Tackling":"at_tackle_avg_lost","Missed Balls":"at_missed_balls_avg","Shot Blocking":"at_shot_block_avg_lost","Fouls":"at_fouls_avg","Yellow Cards":"at_yellow_cards_avg","Red Cards":"at_red_cards_avg","Direct Red Cards":"at_direct_red_cards_avg"}, "Duels":{"Losses Overall":"at_behavior_losses_duels_overall","Defensive Duels":"at_defensive_duels_avg_lost","Offensive Duels":"at_offensive_duels_avg_lost","Aerial Duels":"at_aerial_duels_avg_lost","Field Aerial Duels":"at_field_aerial_duels_avg_lost"}, "Aerial":{"Losses Overall":"at_behavior_losses_aerial_overall","Aerial Duels":"at_aerial_duels_avg_lost","Field Aerial Duels":"at_field_aerial_duels_avg_lost","Head Shots":"at_head_shots_avg_off_target"}, "Set Pieces":{"Direct Free Kicks":"at_direct_free_kicks_taken_avg_lost"}, "Goalkeeping":{"Losses Overall":"at_behavior_losses_goalkeeping_overall","Saves":"at_shots_against_not_saved","▬Saves with Reflex":"at_shots_against_not_saved_with_reflex","Conceded Goals":"at_conceded_goals_avg","▬Easy Conceded Goals":"at_easy_conceded_goal_avg","▬Far Conceded Goals":"at_far_conceded_goals_avg","▬NearConceded Goals":"at_near_conceded_goals_avg","Control of Area":"at_goalkeeper_exits_avg_lost","▬Punch":"at_goalkeeper_punch_avg_lost","GK Aerial Duels":"at_gk_aerial_duels_avg_lost"}   }, 
  
  
  "EFFICIENCY":{"Passing":{"Efficiency Overall":"at_behavior_efficiency_passing_overall","Passes":"at_accurate_passes_percent","Assists":"at_successful_shot_assists_percent","Short-Medium Passes":"at_accurate_short_medium_pass_percent","Long Passes":"at_successful_long_passes_percent","Key Passes":"at_successful_key_passes_percent","Smart Passes":"at_accurate_smart_passes_percent","Through Passes":"at_successful_through_passes_percent","Crosses":"at_accurate_crosses_percent","Passes to Penalty Area":"at_accurate_pass_to_penalty_area_percent","Passes to Final Third":"at_accurate_passes_to_final_third_percent","Forward Passes":"at_successful_forward_passes_percent","Vertical Passes":"at_successful_vertical_passes_percent","Back Passes":"at_successful_back_passes_percent"}, "Offensive":{"Efficiency Overall":"at_behavior_efficiency_offensive_overall","Linkup Plays":"at_successful_linkup_plays_percent","Offensive Duels":"at_offensive_duels_won","Dribbles":"at_successful_dribbles_percent","Shooting":"at_shots_on_target_percent","▬Shots per Goal":"at_shot_on_target_per_goal","Shots Near Corner":"at_shot_to_near_corner_on_target_percent","Shots Far Corner":"at_shot_to_far_corner_on_target_percent","Head Shots":"at_head_shots_on_target_percent","▬Head Shots per Goal":"at_head_shot_on_target_per_goal","Finishing":"at_goal_conversion_percent","▬Heading":"at_head_goals_conversion_percent"}, "Defensive":{"Efficiency Overall":"at_behavior_efficiency_defensive_overall","Defensive Duels":"at_defensive_duels_won","Tackling":"at_successful_tackle_percent","Shot Blocking":"at_shot_block_percent","Fouls":"at_yellow_cards_per_foul"}, "Duels":{"Efficiency Overall":"at_behavior_efficiency_total_duels_overall","Defensive Duels":"at_defensive_duels_won","Offensive Duels":"at_offensive_duels_won","Aerial Duels":"at_aerial_duels_won","Field Aerial Duels":"at_field_aerial_duels_won"}, "Aerial":{"Efficiency Overall":"at_behavior_efficiency_aerial_overall","Aerial Duels":"at_aerial_duels_won","Field Aerial Duels":"at_field_aerial_duels_won","Head Shots":"at_head_shots_on_target_percent","Head Goals":"at_head_goals_conversion_percent"}, "Set Pieces":{"Direct Free Kicks":"at_direct_free_kicks_on_target_percent","Penalties":"at_penalties_conversion_percent"},"Goalkeeping":{"Efficiency Overall":"at_behavior_efficiency_goalkeeping_overall","Saves":"at_save_percent","▬Saves with Reflex":"at_save_with_reflex_percent","Conceded Goals":"at_clean_sheets","Control of Area":"at_successful_goalkeeper_exits_percent","▬Punch":"at_goalkeeper_punch_accuracy","GK Aerial Duels":"gk_aerial_duels_won"}  }
  
  };

this.attrBehaviourCategoryArray = { 
  
  "PASSING":{"Overalls":{"Overall":"at_main_cat_passing_overall",
"Passes":"at_passes_overall",
"Assists":"at_assists_overall",
"▬Shot  Assists":"at_dummy_field",
"Short-Medium Passes":"at_short_medium_pass_overall",
"Long Passes":"at_long_passes_overall",
"Key Passes":"at_key_passes_overall",
"Smart Passes":"at_smart_passes_overall",
"Through Passes":"at_through_passes_overall",
"Crosses":"at_crosses_overall",
"Passes to Penalty Area":"at_pass_to_penalty_area_overall",
"Passes to Final Third":"at_passes_to_final_third_overall",
"Forward Passes":"at_forward_passes_overall",
"Vertical Passes":"at_vertical_passes_overall",
"Back Passes":"at_back_passes_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_passing_overall",
"Passes":"at_passes_avg",
"Assists":"at_dummy_field",
"▬Shot  Assists":"at_shot_assists_avg",
"Short-Medium Passes":"at_short_medium_pass_avg",
"Long Passes":"at_long_passes_avg",
"Key Passes":"at_key_passes_avg",
"Smart Passes":"at_smart_passes_avg",
"Through Passes":"at_through_passes_avg",
"Crosses":"at_crosses_avg",
"Passes to Penalty Area":"at_pass_to_penalty_area_avg",
"Passes to Final Third":"at_passes_to_final_third_avg",
"Forward Passes":"at_forward_passes_avg",
"Vertical Passes":"at_vertical_passes_avg",
"Back Passes":"at_back_passes_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_passing_overall",
"Passes":"at_passes_avg_won",
"Assists":"at_assists_avg",
"▬Shot  Assists":"at_shot_on_goal_assists_avg",
"Short-Medium Passes":"at_short_medium_pass_avg_won",
"Long Passes":"at_long_passes_won",
"Key Passes":"at_key_passes_avg_won",
"Smart Passes":"at_smart_passes_avg_won",
"Through Passes":"at_through_passes_avg_won",
"Crosses":"at_crosses_avg_won",
"Passes to Penalty Area":"at_pass_to_penalty_area_avg_won",
"Passes to Final Third":"at_passes_to_final_third_avg_won",
"Forward Passes":"at_forward_passes_avg_won",
"Vertical Passes":"at_vertical_passes_avg_won",
"Back Passes":"at_back_passes_avg_won"}, "Losses":{ "Losses Overall":"at_behavior_losses_passing_overall",
"Passes":"at_passes_avg_lost",
"Assists":"at_dummy_field",
"▬Shot  Assists":"at_dummy_field",
"Short-Medium Passes":"at_short_medium_pass_avg_lost",
"Long Passes":"at_long_passes_lost",
"Key Passes":"at_key_passes_avg_lost",
"Smart Passes":"at_smart_passes_avg_lost",
"Through Passes":"at_through_passes_avg_lost",
"Crosses":"at_crosses_avg_lost",
"Passes to Penalty Area":"at_pass_to_penalty_area_avg_lost",
"Passes to Final Third":"at_passes_to_final_third_avg_lost",
"Forward Passes":"at_forward_passes_avg_lost",
"Vertical Passes":"at_vertical_passes_avg_lost",
"Back Passes":"at_back_passes_avg_lost" }, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_passing_overall",
"Passes":"at_accurate_passes_percent",
"Assists":"at_successful_shot_assists_percent",
"▬Shot  Assists":"at_dummy_field",
"Short-Medium Passes":"at_accurate_short_medium_pass_percent",
"Long Passes":"at_successful_long_passes_percent",
"Key Passes":"at_successful_key_passes_percent",
"Smart Passes":"at_accurate_smart_passes_percent",
"Through Passes":"at_successful_through_passes_percent",
"Crosses":"at_accurate_crosses_percent",
"Passes to Penalty Area":"at_accurate_pass_to_penalty_area_percent",
"Passes to Final Third":"at_accurate_passes_to_final_third_percent",
"Forward Passes":"at_successful_forward_passes_percent",
"Vertical Passes":"at_successful_vertical_passes_percent",
"Back Passes":"at_successful_back_passes_percent"},"Tendency":{"Overall":"at_dummy_field",
"Passes":"at_dummy_field",
"Assists":"at_dummy_field",
"▬Shot  Assists":"at_dummy_field",
"Short-Medium Passes":"at_short_medium_pass_own_percentage",
"Long Passes":"at_long_passes_own_percentage",
"Key Passes":"at_key_passes_own_percentage",
"Smart Passes":"at_smart_passes_own_percentage",
"Through Passes":"at_through_passes_own_percentage",
"Crosses":"at_crosses_own_percentage",
"Passes to Penalty Area":"at_pass_to_penalty_area_own_percentage",
"Passes to Final Third":"at_passes_to_final_third_own_percentage",
"Forward Passes":"at_forward_passes_own_percentage",
"Vertical Passes":"at_vertical_passes_own_percentage",
"Back Passes":"at_back_passes_own_percentage"}}, 
  
  
  "OFFENSIVE":{ "Overalls":{"Overall":"at_main_cat_offensive_overall",
"Successful attacking Actions":"at_dummy_field",
"Received Passes":"at_received_pass_overall",
"▬Received Dangerous Passes":"at_dummy_field",
"▬Received Long Passes":"at_dummy_field",
"Linkup Plays":"at_linkup_plays_overall",
"Touches in Box":"at_dummy_field",
"Ball Entry in Final Third":"at_dummy_field",
"Caught Offside":"at_dummy_field",
"Possession Losses":"at_losses_overall",
"▬Own Half Losses":"at_dummy_field",
"▬Dangerous Own Half  Losses":"at_dummy_field",
"Accelerations":"at_dummy_field",
"Offensive Duels":"at_offensive_duels_overall",
"Dribbles":"at_dribbles_overall",
"Shooting":"at_shots_overall",
"▬Shots per Goal":"at_dummy_field",
"Shots Near Corner":"at_shot_to_near_corner_overall",
"Shots Far Corner":"at_shot_to_far_corner_overall",
"Head Shots":"at_head_shots_overall",
"▬Head Shots per Goal":"at_dummy_field",
"Finishing":"at_goals_overall",
"▬Heading":"at_head_goals_overall","▬Non Penalty Goal":"at_dummy_field"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_offensive_overall",
"Successful attacking Actions":"at_dummy_field",
"Received Passes":"at_dummy_field",
"▬Received Dangerous Passes":"at_dummy_field",
"▬Received Long Passes":"at_dummy_field",
"Linkup Plays":"at_linkup_plays_avg",
"Touches in Box":"at_touch_in_box_avg",
"Ball Entry in Final Third":"at_dummy_field",
"Caught Offside":"at_dummy_field",
"Possession Losses":"at_dummy_field",
"▬Own Half Losses":"at_dummy_field",
"▬Dangerous Own Half  Losses":"at_dummy_field",
"Accelerations":"at_dummy_field",
"Offensive Duels":"at_offensive_duels_avg",
"Dribbles":"at_dribbles_avg",
"Shooting":"at_shots_avg",
"▬Shots per Goal":"at_dummy_field",
"Shots Near Corner":"at_shot_to_near_corner_avg",
"Shots Far Corner":"at_shot_to_far_corner_avg",
"Head Shots":"at_head_shots_avg","▬Head Shots per Goal":"at_dummy_field",
"Finishing":"at_dummy_field",
"▬Heading":"at_dummy_field","▬Non Penalty Goal":"at_dummy_field"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_offensive_overall",
"Successful attacking Actions":"at_successful_attacking_actions_avg",
"Received Passes":"at_received_pass_avg",
"▬Received Dangerous Passes":"at_received_dangerous_pass_avg",
"▬Received Long Passes":"at_received_long_pass_avg",
"Linkup Plays":"at_linkup_plays_avg_won",
"Touches in Box":"at_dummy_field",
"Ball Entry in Final Third":"at_ball_entry_in_final_third_avg",
"Caught Offside":"at_dummy_field",
"Possession Losses":"at_dummy_field",
"▬Own Half Losses":"at_dummy_field",
"▬Dangerous Own Half  Losses":"at_dummy_field",
"Accelerations":"at_accelerations_avg",
"Offensive Duels":"at_offensive_duels_avg_won",
"Dribbles":"at_dribbles_avg_won",
"Shooting":"at_shots_avg_on_target",
"▬Shots per Goal":"at_dummy_field",
"Shots Near Corner":"at_shot_to_near_corner_avg_on_target",
"Shots Far Corner":"at_shot_to_far_corner_avg_on_target",
"Head Shots":"at_head_shots_avg_on_target",
"▬Head Shots per Goal":"at_dummy_field",
"Finishing":"at_goals_avg",
"▬Heading":"at_head_goals_avg",
"▬Non Penalty Goal":"at_non_penalty_goal_avg"}, "Losses":{"Losses Overall":"at_behavior_losses_offensive_overall",
"Successful attacking Actions":"at_dummy_field",
"Received Passes":"at_dummy_field",
"▬Received Dangerous Passes":"at_dummy_field",
"▬Received Long Passes":"at_dummy_field",
"Linkup Plays":"at_linkup_plays_avg_lost",
"Touches in Box":"at_dummy_field",
"Caught Offside":"at_offsides_avg",
"Possession Losses":"at_losses_avg",
"▬Own Half Losses":"at_own_half_losses_avg",
"▬Dangerous Own Half  Losses":"at_dangerous_own_half_losses_avg",
"Accelerations":"at_dummy_field",
"Offensive Duels":"at_offensive_duels_avg_lost",
"Dribbles":"at_dribbles_avg_lost",
"Shooting":"at_shots_avg_off_target",
"▬Shots per Goal":"at_dummy_field",
"Shots Near Corner":"at_shot_to_near_corner_avg_off_target",
"Shots Far Corner":"at_shot_to_far_corner_avg_off_target",
"Head Shots":"at_head_shots_avg_off_target","▬Head Shots per Goal":"at_dummy_field","Finishing":"at_dummy_field",
"▬Heading":"at_dummy_field",
"▬Non Penalty Goal":"at_dummy_field"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_offensive_overall",
"Successful attacking Actions":"at_dummy_field",
"Received Passes":"at_dummy_field",
"▬Received Dangerous Passes":"at_dummy_field",
"▬Received Long Passes":"at_dummy_field",
"Linkup Plays":"at_successful_linkup_plays_percent",
"Touches in Box":"at_dummy_field",
"Caught Offside":"at_dummy_field",
"Possession Losses":"at_dummy_field",
"▬Own Half Losses":"at_dummy_field",
"▬Dangerous Own Half  Losses":"at_dummy_field",
"Accelerations":"at_dummy_field",
"Offensive Duels":"at_offensive_duels_won",
"Dribbles":"at_successful_dribbles_percent",
"Shooting":"at_shots_on_target_percent",
"▬Shots per Goal":"at_shot_on_target_per_goal",
"Shots Near Corner":"at_shot_to_near_corner_on_target_percent",
"Shots Far Corner":"at_shot_to_far_corner_on_target_percent",
"Head Shots":"at_head_shots_on_target_percent",
"▬Head Shots per Goal":"at_head_shot_on_target_per_goal",
"Finishing":"at_goal_conversion_percent",
"▬Heading":"at_head_goals_conversion_percent","▬Non Penalty Goal":"at_dummy_field"},"Tendency":{"Overall":"at_dummy_field",
"Successful atacking Actions":"at_dummy_field",
"Received Passes":"at_dummy_field",
"▬Received Dangerous Passes":"at_received_dangerous_pass_own_percentage",
"▬Received Long Passes":"at_received_long_pass_own_percentage",
"Linkup Plays":"at_dummy_field",
"Touches in Box":"at_dummy_field",
"Ball Entry in Final Third":"at_dummy_field",
"Caught Offside":"at_dummy_field",
"Possession Losses":"at_dummy_field",
"▬Own Half Losses":"at_own_half_losses_own_percentage",
"▬Dangerous Own Half  Losses":"at_dangerous_own_half_losses_own_percentage",
"Accelerations":"at_dummy_field",
"Offensive Duels":"at_dummy_field",
"Dribbles":"at_dummy_field",
"Shooting":"at_dummy_field",
"▬Shots per Goal":"at_dummy_field",
"Shots Near Corner":"at_shot_to_near_corner_own_percentage",
"Shots Far Corner":"at_shot_to_far_corner_own_percentage",
"Head Shots":"at_head_shots_own_percentage",
"▬Head Shots per Goal":"at_dummy_field",
"Finishing":"at_dummy_field",
"▬Heading":"at_dummy_field","▬Non Penalty Goal":"at_dummy_field"} }, 
  
  
  "DEFENSIVE":{"Overalls":{"Overall":"at_main_cat_defensive_overall",
"Successful Defensive Actions":"at_dummy_field",
"Defensive Duels":"at_defensive_duels_overall",
"Tackling":"at_tackle_overall",
"▬Possession Adjusted Tackle":"at_dummy_field",
"Interceptions":"at_interceptions_overall",
"▬Counterattack Interceptions":"at_dummy_field",
"▬Possession Adjusted Interceptions":"at_dummy_field",
"Recoveries":"at_recoveries_overall",
"▬Opponent Half Recoveries":"at_dummy_field",
"▬Dangerous Opponent Half Recoveries":"at_dummy_field",
"Clearances":"at_dummy_field",
"Missed Balls":"at_dummy_field",
"Shot Blocking":"at_shot_block_overall",
"Fouls":"at_dummy_field",
"Bookings":"at_bookings_overall","Yellow Cards":"at_dummy_field",
"Red Cards":"at_dummy_field",
"Direct Red Cards":"at_dummy_field"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_defensive_overall",
"Successful Defensive Actions":"at_dummy_field",
"Defensive Duels":"at_defensive_duels_avg",
"Tackling":"at_tackle_avg",
"▬Possession Adjusted Tackle":"at_possession_adjusted_tackle",
"Interceptions":"at_dummy_field",
"▬Counterattack Interceptions":"at_dummy_field",
"▬Possession Adjusted Interceptions":"at_dummy_field",
"Recoveries":"at_dummy_field",
"▬Opponent Half Recoveries":"at_dummy_field",
"▬Dangerous Opponent Half Recoveries":"at_dummy_field",
"Clearances":"at_dummy_field",
"Missed Balls":"at_dummy_field",
"Shot Blocking":"at_shot_block_avg","Fouls":"at_dummy_field",
"Bookings":"at_dummy_field","Yellow Cards":"at_dummy_field",
"Red Cards":"at_dummy_field",
"Direct Red Cards":"at_dummy_field"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_defensive_overall",
"Successful Defensive Actions":"at_successful_defensive_actions_avg",
"Defensive Duels":"at_defensive_duels_avg_won",
"Tackling":"at_tackle_avg_won",
"▬Possession Adjusted Tackle":"at_dummy_field",
"Interceptions":"at_interceptions_avg",
"▬Counterattack Interceptions":"at_counterattack_interception_avg",
"▬Possession Adjusted Interceptions":"at_possession_adjusted_interceptions",
"Recoveries":"at_recoveries_avg",
"▬Opponent Half Recoveries":"at_opponent_half_recoveries_avg",
"▬Dangerous Opponent Half Recoveries":"at_dangerous_opponent_half_recoveries_avg",
"Clearances":"at_clearance_avg",
"Missed Balls":"at_dummy_field",
"Shot Blocking":"at_shot_block_avg_won","Fouls":"at_dummy_field","Bookings":"at_dummy_field","Yellow Cards":"at_dummy_field",
"Red Cards":"at_dummy_field",
"Direct Red Cards":"at_dummy_field"}, "Losses":{"Losses Overall":"at_behavior_losses_defensive_overall",
"Successful Defensive Actions":"at_dummy_field",
"Defensive Duels":"at_defensive_duels_avg_lost",
"Tackling":"at_tackle_avg_lost",
"▬Possession Adjusted Tackle":"at_dummy_field",
"Interceptions":"at_dummy_field",
"▬Counterattack Interceptions":"at_dummy_field",
"▬Possession Adjusted Interceptions":"at_dummy_field",
"Recoveries":"at_dummy_field",
"▬Opponent Half Recoveries":"at_dummy_field",
"▬Dangerous Opponent Half Recoveries":"at_dummy_field",
"Clearances":"at_dummy_field",
"Missed Balls":"at_missed_balls_avg",
"Shot Blocking":"at_shot_block_avg_lost",
"Fouls":"at_fouls_avg",
"Bookings":"at_dummy_field",
"Yellow Cards":"at_yellow_cards_avg",
"Red Cards":"at_red_cards_avg",
"Direct Red Cards":"at_direct_red_cards_avg"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_defensive_overall",
"Successful Defensive Actions":"at_dummy_field",
"Defensive Duels":"at_defensive_duels_won",
"Tackling":"at_successful_tackle_percent",
"▬Possession Adjusted Tackle":"at_dummy_field",
"Interceptions":"at_dummy_field",
"▬Counterattack Interceptions":"at_dummy_field",
"▬Possession Adjusted Interceptions":"at_dummy_field",
"Recoveries":"at_dummy_field",
"▬Opponent Half Recoveries":"at_dummy_field",
"▬Dangerous Opponent Half Recoveries":"at_dummy_field",
"Clearances":"at_dummy_field",
"Missed Balls":"at_dummy_field",
"Shot Blocking":"at_shot_block_percent",
"Fouls":"at_yellow_cards_per_foul","Bookings":"at_dummy_field",
"Yellow Cards":"at_dummy_field",
"Red Cards":"at_dummy_field",
"Direct Red Cards":"at_dummy_field"},"Tendency":{"Overall":"at_dummy_field",
"Successful Defensive Actions":"at_dummy_field",
"Defensive Duels":"at_dummy_field",
"Tackling":"at_dummy_field",
"▬Possession Adjusted Tackle":"at_possession_adjusted_tackle_percentage",
"Interceptions":"at_dummy_field",
"▬Counterattack Interceptions":"at_counterattack_interception_own_percentage",
"▬Possession Adjusted Interceptions":"at_possession_adjusted_interceptions_own_percentage",
"Recoveries":"at_dummy_field",
"▬Opponent Half Recoveries":"at_opponent_half_recoveries_own_percentage",
"▬Dangerous Opponent Half Recoveries":"at_dangerous_opponent_half_recoveries_own_percentage",
"Clearances":"at_dummy_field",
"Missed Balls":"at_dummy_field",
"Shot Blocking":"at_dummy_field",
"Fouls":"at_dummy_field",
"Bookings":"at_dummy_field","Yellow Cards":"at_dummy_field",
"Red Cards":"at_dummy_field",
"Direct Red Cards":"at_dummy_field"}  },
  
  
  "DUELS":{ "Overalls":{"Overall":"at_main_cat_duels_overall",
"Defensive Duels":"at_defensive_duels_overall",
"Offensive Duels":"at_offensive_duels_overall",
"Aerial Duels":"at_aerial_duels_overall",
"Pressing Duels":"at_dummy_field",
"Loose Ball Duels":"at_dummy_field"}, "Involvement":{ "Involvement Overall":"at_behavior_involvement_duels_overall",
"Defensive Duels":"at_defensive_duels_avg",
"Offensive Duels":"at_offensive_duels_avg",
"Aerial Duels":"at_aerial_duels_avg",
"Pressing Duels":"at_pressing_duels_avg",
"Loose Ball Duels":"at_loose_ball_duels_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_duels_overall",
"Defensive Duels":"at_defensive_duels_avg_won",
"Offensive Duels":"at_offensive_duels_avg_won",
"Aerial Duels":"at_aerial_duels_avg_won","Pressing Duels":"at_dummy_field",
"Loose Ball Duels":"at_dummy_field"}, "Losses":{"Losses Overall":"at_behavior_losses_duels_overall",
"Defensive Duels":"at_defensive_duels_avg_lost",
"Offensive Duels":"at_offensive_duels_avg_lost",
"Aerial Duels":"at_aerial_duels_avg_lost","Pressing Duels":"at_dummy_field",
"Loose Ball Duels":"at_dummy_field"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_duels_overall",
"Defensive Duels":"at_defensive_duels_won",
"Offensive Duels":"at_offensive_duels_won",
"Aerial Duels":"at_aerial_duels_won","Pressing Duels":"at_dummy_field",
"Loose Ball Duels":"at_dummy_field"},"Tendency":{"Overall":"at_dummy_field",
"Defensive Duels":"at_dummy_field",
"Offensive Duels":"at_dummy_field",
"Aerial Duels":"at_dummy_field",
"Field Aerial Duels":"at_dummy_field",
"Pressing Duels":"at_dummy_field",
"Loose Ball Duels":"at_dummy_field"} }, 
  
  "AERIAL":{ "Overalls":{"Overall":"at_main_cat_aerial_overall",
"Aerial Duels":"at_aerial_duels_overall",
"Head Shots":"at_head_shots_overall",
"Head Goals":"at_head_goals_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_aerial_overall",
"Aerial Duels":"at_aerial_duels_avg",
"Head Shots":"at_head_shots_avg","Head Goals":"at_dummy_field"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_aerial_overall",
"Aerial Duels":"at_aerial_duels_avg_won",
"Head Shots":"at_head_shots_avg_on_target",
"Head Goals":"at_head_goals_avg"}, "Losses":{"Losses Overall":"at_behavior_losses_aerial_overall",
"Aerial Duels":"at_aerial_duels_avg_lost",
"Head Shots":"at_head_shots_avg_off_target","Head Goals":"at_dummy_field"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_aerial_overall",
"Aerial Duels":"at_aerial_duels_won",
"Head Shots":"at_head_shots_on_target_percent",
"Head Goals":"at_head_goals_conversion_percent"},"Tendency":{"Overall":"at_dummy_field",
"Aerial Duels":"at_dummy_field",
"Head Shots":"at_head_shots_own_percentage",
"Head Goals":"at_dummy_field"} }, 
  
  
  "SET PIECES":{"Overalls":{"Overall":"at_main_cat_set_pieces_overall",
"Free Kicks":"at_dummy_field",
"Direct Free Kicks":"at_direct_free_kicks_taken_overall",
"Corners":"at_dummy_field",
"Penalties":"at_penalties_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_set_pieces_overall",
"Free Kicks":"at_free_kicks_taken_avg",
"Direct Free Kicks":"at_direct_free_kicks_taken_avg",
"Corners":"at_corners_taken_avg",
"Penalties":"at_penalties_taken_avg"},
 "Productivity":{"Overall":"at_dummy_field","Free Kicks":"at_dummy_field","Direct Free Kicks":"at_direct_free_kicks_taken_avg_won","Corners":"at_dummy_field",
"Penalties":"at_dummy_field"}, 
"Losses":{"Overall":"at_dummy_field","Free Kicks":"at_dummy_field","Direct Free Kicks":"at_direct_free_kicks_taken_avg_lost","Corners":"at_dummy_field",
"Penalties":"at_dummy_field"},
"Efficiency":{"Overall":"at_dummy_field","Free Kicks":"at_dummy_field","Direct Free Kicks":"at_direct_free_kicks_on_target_percent","Corners":"at_dummy_field",
"Penalties":"at_penalties_conversion_percent"},"Tendency":{"Overall":"at_dummy_field",
"Free Kicks":"at_dummy_field",
"Direct Free Kicks":"at_dummy_field",
"Corners":"at_dummy_field",
"Penalties":"at_dummy_field"}  }, 
  
  
  "GOALKEEPING":{"Overalls":{"Goalkeeping":"at_main_cat_goalkeeping_overall",
"Saves":"at_shots_against_overall",
"▬Saves with Reflex":"at_save_with_reflex_overall",
"▬Super Save":"at_dummy_field",
"Conceded Goals":"at_conceded_goals_overall",
"▬Easy Conceded Goals":"at_dummy_field",
"▬Far Conceded Goals":"at_dummy_field",
"▬NearConceded Goals":"at_dummy_field",
"Control of Area":"at_goalkeeper_exits_overall",
"▬Punch":"at_goalkeeper_punch_overall",
"▬Claim":"at_dummy_field",
"▬Claim to Punch":"at_dummy_field",
"GK Aerial Duels":"at_gk_aerial_duels_overall",
"GK Reliability":"at_gk_reliability_overall"}, "Involvement":{"Involvement Overall":"at_main_cat_goalkeeping_involv",
"Saves":"at_shots_against_avg",
"▬Saves with Reflex":"at_save_with_reflex_avg",
"Conceded Goals":"at_dummy_field",
"▬Easy Conceded Goals":"at_dummy_field",
"▬Far Conceded Goals":"at_dummy_field",
"▬NearConceded Goals":"at_dummy_field",
"Control of Area":"at_goalkeeper_exits_avg",
"▬Punch":"at_goalkeeper_punch_avg",
"▬Claim":"at_goalkeeper_claim_avg",
"▬Claim to Punch":"at_goalkeeper_claim_to_punch",
"GK Aerial Duels":"at_gk_aerial_duels_avg",
"GK Reliability":"at_dummy_field"}, "Productivity":{"Productivity Overall":"at_main_cat_goalkeeping_productivity",
"Saves":"at_shots_against_saved",
"▬Saves with Reflex":"at_shots_against_saved_with_reflex",
"▬Super Save":"at_super_save_avg",
"Conceded Goals":"at_dummy_field",
"▬Easy Conceded Goals":"at_dummy_field",
"▬Far Conceded Goals":"at_dummy_field",
"▬NearConceded Goals":"at_dummy_field",
"Control of Area":"at_goalkeeper_exits_avg_won",
"▬Punch":"at_goalkeeper_punch_avg_won",
"▬Claim":"at_dummy_field",
"▬Claim to Punch":"at_dummy_field",
"GK Aerial Duels":"at_gk_aerial_duels_avg_won",
"GK Reliability":"at_dummy_field"}, "Losses":{"Losses Overall":"at_main_cat_goalkeeping_losses",
"Saves":"at_shots_against_not_saved",
"▬Saves with Reflex":"at_shots_against_not_saved_with_reflex",
"Conceded Goals":"at_conceded_goals_avg",
"▬Easy Conceded Goals":"at_easy_conceded_goal_avg",
"▬Far Conceded Goals":"at_far_conceded_goals_avg",
"▬NearConceded Goals":"at_near_conceded_goals_avg",
"Control of Area":"at_goalkeeper_exits_avg_lost",
"▬Punch":"at_goalkeeper_punch_avg_lost",
"▬Claim":"at_dummy_field",
"▬Claim to Punch":"at_dummy_field",
"GK Aerial Duels":"at_gk_aerial_duels_avg_lost",
"GK Reliability":"at_dummy_field"}, "Efficiency":{"Efficiency Overall":"at_main_cat_goalkeeping_efficiency",
"Saves":"at_save_percent",
"▬Saves with Reflex":"at_save_with_reflex_percent",
"Conceded Goals":"at_clean_sheets",
"▬Easy Conceded Goals":"at_dummy_field",
"▬Far Conceded Goals":"at_dummy_field",
"▬NearConceded Goals":"at_dummy_field",
"Control of Area":"at_successful_goalkeeper_exits_percent",
"▬Punch":"at_goalkeeper_punch_accuracy",
"▬Claim":"at_dummy_field",
"▬Claim to Punch":"at_dummy_field",
"GK Aerial Duels":"gk_aerial_duels_won",
"GK Reliability":"at_dummy_field"},"Tendency":{"Goalkeeping":"at_dummy_field",
"Saves":"at_dummy_field",
"▬Saves with Reflex":"at_save_with_reflex_own_percentage",
"▬Super Save":"at_super_save_own_percentage",
"Conceded Goals":"at_dummy_field",
"▬Easy Conceded Goals":"at_easy_conceded_goal_own_percentage",
"▬Far Conceded Goals":"at_far_conceded_goals_own_percentage",
"▬NearConceded Goals":"at_near_conceded_goals_own_percentage",
"Control of Area":"at_dummy_field",
"▬Punch":"at_dummy_field",
"▬Claim":"at_dummy_field",
"▬Claim to Punch":"at_dummy_field",
"GK Aerial Duels":"at_dummy_field",
"GK Reliability":"at_dummy_field"} } 
  
  }



    let p_id = 0;
   
	this.route.params
	.subscribe((params: Params) => {
		p_id = params.p_id;
	});
    
     let seasonsPlayer = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    seasonsPlayer = params.seasons_data;
    this.seasonV=seasonsPlayer;
      
  });

   let scopePlayer = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    scopePlayer = params.scope_data;
    this.scopeV=scopePlayer;
  });
    this.seasons_player= 'playersStats'+seasonsPlayer+'s';
     this.scope_player='players'+scopePlayer+'Attributes'+seasonsPlayer+'s';
    /* code to get url parameter */
   

    this.userData = JSON.parse(localStorage.getItem('userdata'));
         
	this.seasons =
    {
        "2015":"2015-2016",
        "2016":"2016-2017",
		"2017":"2017-2018"
	}
	
	this.scope =
    {       
        "Expected":"Expected",
        "Domestic":"Domestic",
        "International":"International",
     }
	

     this.playersService.getPlayerProfile(p_id,seasonsPlayer,scopePlayer).then(players => {
       this.playerProfile=players;
       this.isAddShortList=players['shortlistPlayers'].length;
  this.isAddWatchList=players['watchlists'].length;
       console.log(players);
       console.log('seasonsPlayer');

       console.log(seasonsPlayer);
       if(seasonsPlayer != 2016){
         this.playerProfile['playersStats2016s'] = players['playersStats' + seasonsPlayer + 's'];
         this.playerProfile['players' + scopePlayer + 'Attributes2016s'] = players['players' + scopePlayer + 'Attributes' + seasonsPlayer + 's'];
       }

       this.playerProfile['market_value_money'] = this.moneyValue(players['playersStats2016s']['market_value']);

       // console.log('countLength'+players['shortlistPlayers'].length);
       // console.log(players[this.seasons_player]['positions'][0]);
       // console.log(players[this.scope_player]['at_main_cat_set_pieces_overall']);
       // console.log(this.playerProfile?.length);
       this.playerProfileName=players.full_name;
       this.playerProfileTitle=players.full_name+', '+players[this.seasons_player]['positions'][0]+', '+players['current_team_name']+', '+players['age']+', '+players[this.seasons_player]['market_value']+', '+players[this.seasons_player]['contract_expires'];
       this.birthday= players.birth_date;    
       this.nationality= players.passport_country_names;    
       this.height= players[this.seasons_player]['height'];    
       this.weight= players[this.seasons_player]['weight'];    
       this.foot= players[this.seasons_player]['foot'];    
       this.recently_transferred= players[this.seasons_player]['recently_transferred'];    
       this.primary_position= players[this.seasons_player]['primary_position'];    
       this.primary_position_percent= players[this.seasons_player]['primary_position_percent'];    
       this.secondary_position= players[this.seasons_player]['secondary_position'];    
       this.secondary_position_percent= players[this.seasons_player]['secondary_position_percent'];    
       this.third_position= players[this.seasons_player]['third_position'];    
       this.third_position_percent= players[this.seasons_player]['third_position_percent'];    
       this.on_loan= players[this.seasons_player]['on_loan'];    
       this.total_matches= players[this.seasons_player]['total_matches'];    
       this.minutes_on_field= players[this.seasons_player]['minutes_on_field'];    
       this.minutes_per_app= players[this.seasons_player]['minutes_per_app'];    
       this.n90s= players[this.seasons_player]['n90s'];  
       this.at_main_cat_passing_overall= players[this.scope_player]['at_main_cat_passing_overall'];    
       this.at_main_cat_offensive_overall= players[this.scope_player]['at_main_cat_offensive_overall'];    
       this.at_main_cat_defensive_overall= players[this.scope_player]['at_main_cat_defensive_overall'];    
       this.at_main_cat_duels_overall= players[this.scope_player]['at_main_cat_duels_overall'];    
       this.at_main_cat_aerial_overall= players[this.scope_player]['at_main_cat_aerial_overall'];    
       this.at_main_cat_set_pieces_overall= players[this.scope_player]['at_main_cat_set_pieces_overall'];    
             console.log(this.at_main_cat_passing_overall);

             let xAxis = players.marketHistories.data.map(function(a) {return a.datum_mw;});
             let yAxis = players.marketHistories.data.map(function(a) {return a.y;});
             let yAxisVal = players.marketHistories.data.map(function(a) {return a.mw;});


           this.setChartValue(xAxis,yAxis,yAxisVal);
       console.log('playerProfile');
       console.log(this.playerProfile);
     });



	
 

  
     
    
  }


  public setChartValue(xAxis,yAxis,yAxisVal){

     this.line4 = {
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data: ['Market Value'],
      textStyle: {
        color: this.config.textColor
      }
    },
    
    calculable : true,
    xAxis : [
      {
        type : 'category',
        title: 'Date',
        boundaryGap : false,
        data : xAxis,
        axisLabel : {
          formatter: '{value}',
          textStyle: {
            color: this.config.textColor
          }
        },
        splitLine: {
          lineStyle: {
            color: this.config.splitLineColor
          }
        }
      }
    ],
    yAxis : [
      {
        type : 'value',
        axisLabel : {
          formatter: '€ {value}',
          textStyle: {
            color: this.config.textColor
          }
        },
        splitLine: {
          lineStyle: {
            color: this.config.splitLineColor
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: this.config.splitAreaColor
          }
        }
      }
    ],
    series : [
      {
        name: 'Market Value',
        type: 'line',
        stack: 'Sum',
        data: yAxis
      }
    ]
  };

  
}

  onChangeSeason(val){
    let p_id = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    p_id = params.p_id;
  });
  let scopePlayer = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    scopePlayer = params.scope_data;
    this.scopeV=scopePlayer;
  });
     
    // console.log('onChangeSeason'+val);
    this.router.navigate(['/app/playerdetail', {p_id:p_id,seasons_data:val,scope_data:scopePlayer}]);
    //     return false;
     // let playerProfiledata = JSON.parse(localStorage.getItem('playerProfiledata'));

     // playerProfiledata.seasons_player_storage=val;
     //  localStorage.setItem('playerProfiledata',JSON.stringify(playerProfiledata));
      window.location.reload();
}

public moneyValue(valToConvert){

  if ( valToConvert ) {
    let abs = Math.abs( valToConvert );
    if ( abs >= Math.pow( 10, 12 ) ) {
    // trillion
    valToConvert = ( valToConvert / Math.pow( 10, 12 ) ).toFixed( 2 ) + "T";
    } else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
    // billion
    valToConvert = ( valToConvert / Math.pow( 10, 9 ) ).toFixed( 2 ) + "B";
    } else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
    // million
    valToConvert = ( valToConvert / Math.pow( 10, 6 ) ).toFixed( 2 ) + "M";
    } else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
    // thousand
    valToConvert = ( valToConvert / Math.pow( 10, 3 ) ).toFixed( 2 ) + "K";
    }

    valToConvert =  valToConvert.replace('.00','');
    return valToConvert;
  }

}
  
  
	
  public onChangeScope(val){
    let p_id = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    p_id = params.p_id;
  });

 let seasonsPlayer = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    seasonsPlayer = params.seasons_data;
    this.seasonV=seasonsPlayer;
      
  });

    this.router.navigate(['/app/playerdetail',{p_id:p_id,seasons_data:seasonsPlayer,scope_data:val}]);

     //    console.log('onChangeScope'+val);
     // let playerProfiledata = JSON.parse(localStorage.getItem('playerProfiledata'));

     // playerProfiledata.scope_player_storage=val;
     //  localStorage.setItem('playerProfiledata',JSON.stringify(playerProfiledata));
      window.location.reload();
    }

	 public addToWatchlist(): void {
    let watchlistPlayers = [];
        let userData = JSON.parse(localStorage.getItem('userdata'));
    this.layoutService.updatePreloaderState('active');   
       let p_id = 0;
   
  this.route.params
  .subscribe((params: Params) => {
    p_id = params.p_id;
  });
           // let playerIdSelected = $(this).val();
       
            
                watchlistPlayers.push({
                  "user_id": userData.userId,
                  "player_id": p_id,
                  "usersId": userData.userId
                });
            
       
     {
    this.playersService.createWatchList(watchlistPlayers)
      .then(res => {   
      this.isAddWatchList=1; 
          this.openSnackBar(AppSettings.WATCHLIST_SUCCESS_MESSAGE,AppSettings.SNACK_BAR_ACTION);    
      });
    
  }
	}
}
