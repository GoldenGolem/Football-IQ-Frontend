import { Component, Input, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';

import { PlayersService } from '../../core/services/players.service';
import { ShortlistService } from '../../core/services/shortlist.service';
import { AddViewDialogComponent } from '../../dashboard/add-view-dialog/add-view-dialog.component';

// import { MdSnackBar, MdDialog } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../../dashboard/dialog-overview-example-dialog.component';
import { DialogResultExampleDialogComponent } from '../../dashboard/dialog-result-example-dialog.component';




@Component({
  selector: 'column-filter',
  styles: [],
  templateUrl: './columnfilter.component.html',
})

export class ColumnfilterComponent implements OnInit {

	@Input() playerKeys: string[];
	basicArray : any;
	basickeys : any;
	
	partArray : any;
	partkeys : any;
	
	attrComboArray : any;
	attrClassicAllArray : any; 
	attrClassicOverAllArray : any;  
    attrBehaviourTypeArray : any;  
	attrBehaviourCategoryArray : any;
	
	
	constructor(
    public dialog: MdDialog
  ) {

    
  }

	public toggleDataColumn(){
		let table = window['table'];
		let column = table.column( $(this).attr('data-column') + ':name' );
        let isChecked = $(this).find('.mat-checkbox-input').is(":checked");

        // Toggle the visibility
        column.visible( ! isChecked );
	}
	
	
	selectedOption;
	openDialogWithaddToViewlistForm() {
    //if(confirm(AppSettings.ADD_SHORTLIST_CONFIRM)){
      const dialogRef = this.dialog.open(AddViewDialogComponent);
       let instance = dialogRef.componentInstance;
      dialogRef.afterClosed().subscribe((result) => {
        this.selectedOption = result;
      });
    //}    
  }
	
	statisPassingArray : any;
	statisOffensiveArray : any;
	statisDefensiveArray : any;
	statisDuelsArray : any;
	statisAerialArray : any;
	statisSetpiecesArray : any;
	statisGoalkeeptingArray : any;
	
  ngOnInit() {
	

	/*this.basicArray =
    {
        "Player":"full_name",
		"Team":"current_team_name",
		"Position":"positions",
		"Birth Date":"birth_date",
		"Age":"age",
		"Market Value":"market_value",
		"Contract":"contract_expires",
		"Apps":"total_matches",
		"Mins":"minutes_on_field",
		"Min/App":"minutes_per_app",
		"90s":"90s",
		"G":"goals",
		"A":"assists",
		"Nationalities":"passport_country_names",
		"H":"height",
		"W":"weight",
		"League":"domestic_competition_name",
    };*/
	
	
	this.basicArray =
    {
        "Age":"age",
		"Current Team":"team_names",
		"Position":"positions",
		"Market Value":"market_value",
		"Birth Data":"birth_date",
		"Current Competition":"current_competition",
		"Foot":"foot",
		"Contract":"contract_expires",
		"Nationalities":"passport_country_codes",
		"H":"height",
		"W":"weight",
		"Team":"team_names",
		"Tier":"leaque.level",
		"Current Competition Country":"current_competition_country"
    };
	
	
		
	this.statisPassingArray =
	{
	"Assists":{"Total Assists":"assists",
				"Assists":"assists_avg",
				"Total Shot Assists":"shot_assists_avg",
				"Shot Assists":"shot_on_goal_assists_avg",
				"Successful Shot Assists %":"successful_shot_assists_percent"
				},
	"Passes":{"Passes Attempted":"passes_avg",
			"Successful Passes":"passes_avg_won",
			"Unsuccessful Passes":"passes_avg_lost",
			"Pass Success %":"accurate_passes_percent",
			"Passes of Team %":"passes_of_team_percent",
			"Average Pass Length":"average_pass_length"},
	"Short Passes":{"Short-Medium Passes Attempted":"short_medium_pass_avg",
				"Successful Short-Medium Passes":"short_medium_pass_avg_won",
				"Unsuccessful Short-Medium Passes":"short_medium_pass_avg_lost",
				"Short-Medium Passes Success %":"accurate_short_medium_pass_percent",
				"Short-Medium Passes %":"short_medium_pass_own_percentage"},
	"Long Passes":{"Long Passes Attempted":"long_passes_avg",
					"Successful Long Passes":"long_passes_won",
					"Unsuccessful Long Passes":"long_passes_lost",
					"Long Passes Success %":"successful_long_passes_percent",
					"Long Passes of Team %":"long_passes_of_team_percent",
					"Long Passes %":"long_passes_own_percentage",
					"Average Long Pass Length":"average_long_pass_length",},
    "Key Passes":{"Key Passes Attempted":"key_passes_avg",
				"Successful Key Passes":"key_passes_avg_won",
				"Unsuccessful Key Passes":"key_passes_avg_lost",
				"Key Passes Success %":"successful_key_passes_percent",
				"Key Passes %":"key_passes_own_percentage"
				},
	"Smart Passes":{"Smart Passes Attempted":"smart_passes_avg",
				"Successful Smart Passes":"smart_passes_avg_won",
				"Unsuccessful Smart Passes":"smart_passes_avg_lost",
				"Smart Passes Success %":"accurate_smart_passes_percent",
				"Smart Passes of Team %":"smart_passes_of_team_percent",
				"Smart Passes %":"smart_passes_own_percentage"},
	"Through Passes":{"Through Passes Attempted":"through_passes_avg",
					"Successful Through Passes":"through_passes_avg_won",
					"Unsuccessful Through Passes":"through_passes_avg_lost",
					"Through Passes Success %":"successful_through_passes_percent",
					"Through Passes %":"through_passes_own_percentage"},
	"Crosses":{"Crosses Attempted":"crosses_avg",
				"Successful Crosses":"crosses_avg_won",
				"Unsuccessful Crosses":"crosses_avg_lost",
				"Crosses Success %":"accurate_crosses_percent",
				"Crosses Wilson":"crosses_wilson",
				"Crosses %":"crosses_own_percentage"},
	"Passes to Penalty Area":{"Passes to Penalty Area Attempted":"pass_to_penalty_area_avg",
							"Successful Passes to Penalty Area":"pass_to_penalty_area_avg_won",
							"Unsuccessful Passes to Penalty Area":"pass_to_penalty_area_avg_lost",
							"Pass to Penalty Area Success %":"accurate_pass_to_penalty_area_percent",
							"Passes to Penalty Area %":"pass_to_penalty_area_own_percentage"},
	"Passes to Final Third":{"Passes to Final Third Attempted":"passes_to_final_third_avg",
							"Successful Passes to Final Third":"passes_to_final_third_avg_won",
							"Unsuccessful Passes to Final Third":"passes_to_final_third_avg_lost",
							"Passes to Final Third Success %":"accurate_passes_to_final_third_percent",
							"Passes to Final Third %":"passes_to_final_third_own_percentage"},
	"Forward Passes":{"Forward Passes Attempted":"forward_passes_avg",
					"Successful Forward Passes":"forward_passes_avg_won",
					"Unsuccessful Forward Passes":"forward_passes_avg_lost",
					"Forward Passes Success %":"successful_forward_passes_percent",
					"Forward Passes %":"forward_passes_own_percentage"},
	"Vertical Passes":{"Vertical Passes Attempted":"vertical_passes_avg",
						"Successful Vertical Passes":"vertical_passes_avg_won",
						"Unsuccessful Vertical Passes":"vertical_passes_avg_lost",
						"Vertical Success %":"successful_vertical_passes_percent",
						"Vertical Passes vs Total Passes":"vertical_passes_own_percentage"},
	"Back Passes":{"Back Passes Attempted":"back_passes_avg",
					"Successful Back Passes":"back_passes_avg_won",
					"Unsuccessful Back Passes":"back_passes_avg_lost",
					"Back Passes Success %":"successful_back_passes_percent",
					"Back Passes %":"back_passes_own_percentage"},
	
	
	};	
	
	this.statisOffensiveArray = {
	"Received Passes":{"Received Passes":"received_pass_avg",
						"Received Dangerous Passes":"received_dangerous_pass_avg",
						"Received Dangerous Passes %":"received_dangerous_pass_own_percentage",
						"Received Long Passes":"received_long_pass_avg",
						"Received Long Passes %":"received_long_pass_own_percentage",
						"Received Passes of Team %":"received_pass_of_team_percent"},
	"Linkup Plays":{"Total Linkup Plays":"linkup_plays",
					"Linkup Plays Attempted":"linkup_plays_avg",
					"Successful Linkup Plays":"linkup_plays_avg_won",
					"Unsuccessful Linkup Plays":"linkup_plays_avg_lost",
					"Linkup Plays Success %":"successful_linkup_plays_percent"},
	"Possession":{"Possession Losses":"losses_avg",
				"Own Half Possession Losses":"own_half_losses_avg",
				"Own Half Possession Losses%":"own_half_losses_own_percentage",
				"Dangerous Own Half Possession Losses":"dangerous_own_half_losses_avg",
				"Dangerous Own Half Possession Losses%":"dangerous_own_half_losses_own_percentage"},
	"Offensive Duels":{"Offensive Duels Attempted":"offensive_duels_avg",
						"Offensive Duels Won":"offensive_duels_avg_won",
						"Offensive Duels Lost":"offensive_duels_avg_lost",
						"Offensive Duels %":"offensive_duels_won"},
	"Dribbles":{"Dribbles Attempted":"dribbles_avg",
				"Successful Dribbles":"dribbles_avg_won",
				"Unsuccessful Dribbles":"dribbles_avg_lost",
				"Dribbles Success %":"successful_dribbles_percent",
				"Dribbles Wilson":"dribbles_wilson",
				"Average Dribble Distance from Opp Goal":"average_dribble_distance_from_opponent_goal"},
	"Shots":{"Total Shots":"shots",
			"Shots Attempted":"shots_avg",
			"Shots On Target":"shots_avg_on_target",
			"Shots Off Target":"shots_avg_off_target",
			"Shots on Target %":"shots_on_target_percent",
			"Shooting Threat":"shot_on_target_per_goal",
			"Shots Wilson":"shots_wilson"},
	"Shots to Near Corner":{"Shots Attempted Near Corner":"shot_to_near_corner_avg",
							"Shots On Target Near Corner":"shot_to_near_corner_avg_on_target",
							"Shots Off Target Near Corner":"shot_to_near_corner_avg_off_target",
							"Shots on Target Near Corner Success %":"shot_to_near_corner_on_target_percent",
							"Shots Near Corner %":"shot_to_near_corner_own_percentage"},
	"Shots to Far Corner":{"Shots Attempted Far Corner":"shot_to_far_corner_avg",
							"Shots On Target Far Corner":"shot_to_far_corner_avg_on_target",
							"Shots Off Target Far Corner":"shot_to_far_corner_avg_off_target",
							"Shots on Target Far Corner Success %":"shot_to_far_corner_on_target_percent",
							"Shots Far Corner %":"shot_to_far_corner_own_percentage"},
	"Head Shots":{"Total Head Shots":"head_shots",
				"Head Shots Attempted":"head_shots_avg",
				"Head Shots On Target":"head_shots_avg_on_target",
				"Head Shots Off Target":"head_shots_avg_off_target",
				"Head Shots On Target %":"head_shots_on_target_percent",
				"Head Shooting Threat":"head_shot_on_target_per_goal",
				"Head Shots %":"head_shots_own_percentage"},
	"Goals":{"Total Goals":"goals",
			"Goals":"goals_avg",
			"Goal Conversion %":"goal_conversion_percent",
			"Goals Wilson":"goals_wilson"},
	"Non Penalty Goals":{"Total Non Penalty Goals":"non_penalty_goal",
						"Non Penalty Goals":"non_penalty_goal_avg"},
	"Head Goals":{"Total Head Goals":"head_goals",
					"Head Goals":"head_goals_avg",
					"Head Goals Conversion %":"head_goals_conversion_percent"}
	
	};
	
	this.statisDefensiveArray = {
	"Defensive Duels":{"Defensive Duels Attempted":"defensive_duels_avg",
		"Defensive Duels Won":"defensive_duels_avg_won",
		"Defensive Duels Lost":"defensive_duels_avg_lost",
		"Defensive Duels %":"defensive_duels_won"},
	"Tackles":{"Tackles Attempted":"tackle_avg",
				"Tackles Won":"tackle_avg_won",
				"Tackles Lost":"tackle_avg_lost",
				"Tackles Success %":"successful_tackle_percent",
				"Possession Adjusted Tackles":"possession_adjusted_tackle",
				"Possession Adjusted Tackles %":"possession_adjusted_tackle_percentage"},
	"Interceptions":{"Interceptions":"interceptions_avg",
					"Counterattack Interceptions":"counterattack_interception_avg",
					"Counterattack Interceptions %":"counterattack_interception_own_percentage",
					"Possession Adjusted Interceptions":"possession_adjusted_interceptions",
					"Possession Adjusted Interceptions %":"possession_adjusted_interceptions_own_percentage"},
	"Recoveries":{"Recoveries":"recoveries_avg",
				"Opponent Half Recoveries":"opponent_half_recoveries_avg",
				"Opponent Half Recoveries %":"opponent_half_recoveries_own_percentage",
				"Dangerous Opponent Half Recoveries":"dangerous_opponent_half_recoveries_avg",
				"Dangerous Opponent Half Recoveries %":"dangerous_opponent_half_recoveries_own_percentage"},
	"Shots Blocked":{"Block Shot Attempted":"shot_block_avg",
					"Successful Block Shot":"shot_block_avg_won",
					"Unsuccessful Block Shot":"shot_block_avg_lost",
					"Block Shot Success %":"shot_block_percent"},
	"Bookings":{"Total Yellow Cards":"yellow_cards",
				"Total Red Cards":"red_cards",
				"Total Direct Red Cards":"direct_red_cards",
				"Yellow Cards":"yellow_cards_avg",
				"Red Cards":"red_cards_avg",
				"Direct Red Cards":"direct_red_cards_avg",
				"Yellow Cards per Foul":"yellow_cards_per_foul"},
	"Fouls":{"Fouls":"fouls_avg",
				"Fouls of Team Percent":"fouls_of_team_percent"}
	};
	
	this.statisDuelsArray = {
	"Duels":{"Duels Attempted":"duels_avg",
			"Duels Won":"duels_avg_won",
			"Duels Lost":"duels_avg_lost",
			"Duels %":"duels_won"
			},
	"Defensive Duels":{"Defensive Duels Attempted":"defensive_duels_avg",
					"Defensive Duels Won":"defensive_duels_avg_won",
					"Defensive Duels Lost":"defensive_duels_avg_lost",
					"Defensive Duels %":"defensive_duels_won"},
	"Offensive Duels":{"Offensive Duels Attempted":"offensive_duels_avg",
						"Offensive Duels Won":"offensive_duels_avg_won",
						"Offensive Duels Lost":"offensive_duels_avg_lost",
						"Offensive Duels %":"offensive_duels_won"},
	"Aerial Duels":{"Aerial Duels Attempted":"aerial_duels_avg",
					"Aerial Duels Won":"aerial_duels_avg_won",
					"Aerial Duels Lost":"aerial_duels_avg_lost",
					"Aerial Duels %":"aerial_duels_won"},
	"Field Aerial Duels":{"Field Aerial Duels Attempted":"field_aerial_duels_avg",
		"Field Aerial Duels Won":"field_aerial_duels_avg_won",
		"Field Aerial Duels Lost":"field_aerial_duels_avg_lost",
		"Field Aerial Duels Success %":"field_aerial_duels_won"}
	};
	
	this.statisAerialArray = { "Aerial Duels":{"Aerial Duels Attempted":"aerial_duels_avg",
								"Aerial Duels Won":"aerial_duels_avg_won",
								"Aerial Duels Lost":"aerial_duels_avg_lost",
								"Aerial Duels %":"aerial_duels_won"},
	"Field Aerial Duels":{"Field Aerial Duels Attempted":"field_aerial_duels_avg",
						"Field Aerial Duels Won":"field_aerial_duels_avg_won",
						"Field Aerial Duels Lost":"field_aerial_duels_avg_lost",
						"Field Aerial Duels Success %":"field_aerial_duels_won"},
	"Head Shots":{"Total Head Shots":"head_shots",
				"Head Shots Attempted":"head_shots_avg",
				"Head Shots On Target":"head_shots_avg_on_target",
				"Head Shots Off Target":"head_shots_avg_off_target",
				"Head Shots On Target %":"head_shots_on_target_percent",
				"Head Shooting Threat":"head_shot_on_target_per_goal",
				"Head Shots %":"head_shots_own_percentage"},
	"Head Goals":{"Total Head Goals":"head_goals",
					"Head Goals":"head_goals_avg",
					"Head Goals Conversion %":"head_goals_conversion_percent"}
	};
	
	this.statisSetpiecesArray = {
	"Freekicks":{"Freekicks":"free_kicks_taken_avg",
					"Freekicks of Team %":"free_kicks_of_team_percent"},
	"Direct Freekicks":{"Direct Freekicks Taken":"direct_free_kicks_taken_avg",
					"Direct Freekicks On Target":"direct_free_kicks_taken_avg_won",
					"Direct Freekicks Off Target":"direct_free_kicks_taken_avg_lost",
					"Direct Freekicks On Target Success %":"direct_free_kicks_on_target_percent"},
	"Corners":{"Corners Taken":"corners_taken_avg"},
	"Penalties":{"Total Penalties Taken":"penalties_taken",
				"Penalties Taken":"penalties_taken_avg",
				"Penalties Conversion %":"penalties_conversion_percent"}
	};
	
	this.statisGoalkeeptingArray = {
	"Shots Against":{"Total Shots Against":"shots_against",
					"Shots Against":"shots_against_avg"},
	"Saves":{"Saved Shots":"shots_against_saved",
			"Shots Beaten":"shots_against_not_saved",
			"Save Success %":"save_percent"},
	"Saves with Reflex":{"Save with Reflex Average":"save_with_reflex_avg",
					"Saved Shots with Reflex":"shots_against_saved_with_reflex",
					"Shots Beaten with Reflex":"shots_against_not_saved_with_reflex",
					"Saves with Reflex Success%":"save_with_reflex_percent",
					"Saves with Reflex %":"save_with_reflex_own_percentage",
					"Super Save":"super_save_avg",
					"Super Save %":"super_save_own_percentage",
					"Saves Wilson":"saves_wilson"},
	"Conceded Goals":{"Total Conceded Goals":"conceded_goals",
					"Conceded Goals":"conceded_goals_avg",
					"Easy Conceded Goal":"easy_conceded_goal_avg",
					"Easy Conceded Goals %":"easy_conceded_goal_own_percentage",
					"Far Conceded Goals":"far_conceded_goals_avg",
					"Far Conceded Goals %":"far_conceded_goals_own_percentage",
					"Near Conceded Goals":"near_conceded_goals_avg",
					"Near Conceded Goals %":"near_conceded_goals_own_percentage"},
	"GK Exits":{"Goalkeeper Exits":"goalkeeper_exits_avg",
				"Successful Goalkeeper Exits":"goalkeeper_exits_avg_won",
				"Unsuccesful Goalkeeper Exits":"goalkeeper_exits_avg_lost",
				"Successful Goalkeeper Exits %":"successful_goalkeeper_exits_percent"},
	"GK Claims":{"Goalkeeper Claim":"goalkeeper_claim_avg",
				"Goalkeeper Claim to Punch":"goalkeeper_claim_to_punch"},
	"GK Punch":{"Goalkeeper Punch":"goalkeeper_punch_avg",
				"Successful Goalkeeper Punch":"goalkeeper_punch_avg_won",
				"Unsuccessful Goalkeeper Punch":"goalkeeper_punch_avg_lost",
				"Goalkeeper Punch Accuracy %":"goalkeeper_punch_accuracy"},
	"GK Aerial Duels":{"Goalkeeper Aerial Duels":"gk_aerial_duels_avg",
						"Successful Goalkeeper Aerial Duels":"gk_aerial_duels_avg_won",
						"Unsuccessful Goalkeeper Aerial Duels":"gk_aerial_duels_avg_lost",
						"Goalkeeper Aerial Duels Success %":"gk_aerial_duels_won"}
	};
	
    
	
	this.basickeys = Object.keys(this.basicArray);
	
	
	this.partArray =
    {
    	"Apps":"total_matches",
		"Mins":"minutes_on_field",
		"Min/App":"minutes_per_app",
		"90s":"90s",
		"Started":"matches_in_start",
		"Sub In":"matches_substituted",
		"Sub Out":"matches_coming_off",
		"Matches %":"matches_played_percent",
		"Minutes %":"minutes_played_percent",
		"Win %":"win_percent",
		
    };
	
	this.partkeys = Object.keys(this.partArray);
	
	
	
	
	
	this.attrComboArray = {
	"Mentel" : { "Reliability":"at_combo_reliability"},
	"Passing" : {"Possession":"at_combo_ret_possession","Construction":"at_combo_passing_construction","Threat":"at_combo_passing_threat","Creativity":"at_combo_passing_creativity",},
	"Offensive" : {"Point of Reference":"at_combo_point_of_reference","Dangerous Positions":"at_combo_dangerous_positions","Shooting Threat":"at_combo_shooting_threat","Goal scoring":"at_combo_goalscoring","On Ball":"at_combo_ability_with_ball",},
	"Defensive" : {"vs Opponent":"at_combo_against_opponent","Space":"at_combo_covering_space","Defending Deep":"at_combo_def_deep","Workrate":"at_def_workrate",},
	"Aerial" : { "Presence": "at_combo_aerial_presence", "Threat":"at_combo_aerial_threat"}
	};
	

	this.attrClassicAllArray = {"PASSING":{"Passes":{"Overall":"at_passes_overall","Involvement":"at_passes_avg","Productivity":"at_passes_avg_won","Losses":"at_passes_avg_lost","Efficiency":"at_accurate_passes_percent"},"Assists":{"Overall":"at_assists_overall","Productivity":"at_assists_avg","Efficiency":"at_successful_shot_assists_percent"},"▬Shot  Assists":{"Involvement":"at_shot_assists_avg","Productivity":"at_shot_on_goal_assists_avg"},"Short-Medium Passes":{"Overall":"at_short_medium_pass_overall","Involvement":"at_short_medium_pass_avg","Productivity":"at_short_medium_pass_avg_won","Losses":"at_short_medium_pass_avg_lost","Efficiency":"at_accurate_short_medium_pass_percent"},"Long Passes":{"Overall":"at_long_passes_overall","Involvement":"at_long_passes_avg","Productivity":"at_long_passes_won","Losses":"at_long_passes_lost","Efficiency":"at_successful_long_passes_percent"},"Key Passes":{"Overall":"at_key_passes_overall","Involvement":"at_key_passes_avg","Productivity":"at_key_passes_avg_won","Losses":"at_key_passes_avg_lost","Efficiency":"at_successful_key_passes_percent"},"Smart Passes":{"Overall":"at_smart_passes_overall","Involvement":"at_smart_passes_avg","Productivity":"at_smart_passes_avg_won","Losses":"at_smart_passes_avg_lost","Efficiency":"at_accurate_smart_passes_percent"},"Through Passes":{"Overall":"at_through_passes_overall","Involvement":"at_through_passes_avg","Productivity":"at_through_passes_avg_won","Losses":"at_through_passes_avg_lost","Efficiency":"at_successful_through_passes_percent"},"Crosses":{"Overall":"at_crosses_overall","Involvement":"at_crosses_avg","Productivity":"at_crosses_avg_won","Losses":"at_crosses_avg_lost","Efficiency":"at_accurate_crosses_percent"},"Pass to Penalty Area":{"Overall":"at_pass_to_penalty_area_overall","Involvement":"at_pass_to_penalty_area_avg","Productivity":"at_pass_to_penalty_area_avg_won","Losses":"at_pass_to_penalty_area_avg_lost","Efficiency":"at_accurate_pass_to_penalty_area_percent"},"Passes to Final Third":{"Overall":"at_passes_to_final_third_overall","Involvement":"at_passes_to_final_third_avg","Productivity":"at_passes_to_final_third_avg_won","Losses":"at_passes_to_final_third_avg_lost","Efficiency":"at_accurate_passes_to_final_third_percent"},"Forward Passes":{"Overall":"at_forward_passes_overall","Involvement":"at_forward_passes_avg","Productivity":"at_forward_passes_avg_won","Losses":"at_forward_passes_avg_lost","Efficiency":"at_successful_forward_passes_percent"},"Vertical Passes":{"Overall":"at_vertical_passes_overall","Involvement":"at_vertical_passes_avg","Productivity":"at_vertical_passes_avg_won","Losses":"at_vertical_passes_avg_lost","Efficiency":"at_successful_vertical_passes_percent"},"Back Passes":{"Overall":"at_back_passes_overall","Involvement":"at_back_passes_avg","Productivity":"at_back_passes_avg_won","Losses":"at_back_passes_avg_lost","Efficiency":"at_successful_back_passes_percent"} },


	"OFFENSIVE":{"Successful attacking Actions":{"Productivity": "at_successful_attacking_actions_avg"}, "Received Passes":{"Overall":"at_received_pass_overall","Productivity":"at_received_pass_avg"},"▬Received Dangerous Passes":{"Productivity":"at_received_dangerous_pass_avg"},"▬Received Long Passes":{"Productivity":"at_received_long_pass_avg"},"Linkup Plays":{"Overall":"at_linkup_plays_overall","Involvement":"at_linkup_plays_avg","Productivity":"at_linkup_plays_avg_won","Losses":"at_linkup_plays_avg_lost","Efficiency":"at_successful_linkup_plays_percent"},"Touches in Box":{"Involvement":"at_touch_in_box_avg"}, "Ball Entry in Final Third":{"Productivity":"at_ball_entry_in_final_third_avg"},"Caught Offside":{"Losses":"at_offsides_avg"},"Possession Losses":{"Losses":"at_losses_avg"},"▬Own Half Losses":{"Losses":"at_own_half_losses_avg"}, "▬Dangerous Own Half  Losses":{"Losses":"at_dangerous_own_half_losses_avg"},"Accelerations":{"Productivity":"at_accelerations_avg"},"Offensive Duels":{"Overall":"at_offensive_duels_overall","Involvement":"at_offensive_duels_avg","Productivity":"at_offensive_duels_avg_won","Losses":"at_offensive_duels_avg_lost","Efficiency":"at_offensive_duels_won"},"Dribbles":{"Overall":"at_dribbles_overall","Involvement":"at_dribbles_avg","Productivity":"at_dribbles_avg_won","Losses":"at_dribbles_avg_lost","Efficiency":"at_successful_dribbles_percent"},"Shooting":{"Overall":"at_shots_overall","Involvement":"at_shots_avg","Productivity":"at_shots_avg_on_target","Losses":"at_shots_avg_off_target","Efficiency":"at_shots_on_target_percent"},"▬Shots per Goal":{"Efficiency":"at_shot_on_target_per_goal"},"Shots Near Corner":{"Overall":"at_shot_to_near_corner_overall","Involvement":"at_shot_to_near_corner_avg","Productivity":"at_shot_to_near_corner_avg_on_target","Losses":"at_shot_to_near_corner_avg_off_target","Efficiency":"at_shot_to_near_corner_on_target_percent"},"Shots Far Corner":{"Overall":"at_shot_to_far_corner_overall","Involvement":"at_shot_to_far_corner_avg","Productivity":"at_shot_to_far_corner_avg_on_target","Losses":"at_shot_to_far_corner_avg_off_target","Efficiency":"at_shot_to_far_corner_on_target_percent"},"Head Shots":{"Overall":"at_head_shots_overall","Involvement":"at_head_shots_avg","Productivity":"at_head_shots_avg_on_target","Losses":"at_head_shots_avg_off_target","Efficiency":"at_head_shots_on_target_percent"},"▬Head Shots per Goal":{"Efficiency":"head_shot_on_target_per_goal"}, "Finishing":{"Overall":"at_goals_overall","Productivity":"at_goals_avg","Efficiency":"at_goal_conversion_percent"}, "▬Heading":{"Overall":"at_head_goals_overall","Productivity":"at_head_goals_avg","Efficiency":"at_head_goals_conversion_percent"},"▬Non Penalty Goal":{"Productivity":"at_non_penalty_goal_avg"} },
	
	"DEFENSIVE":{"Successful Defensive Actions":{"Productivity":"at_successful_defensive_actions_avg"},"Defensive Duels":{"Overall":"at_defensive_duels_overall","Involvement":"at_defensive_duels_avg","Productivity":"at_defensive_duels_avg_won","Losses":"at_defensive_duels_avg_lost","Efficiency":"at_defensive_duels_won"},"Tackling":{"Overall":"at_tackle_overall","Involvement":"at_tackle_avg","Productivity":"at_tackle_avg_won","Losses":"at_tackle_avg_lost","Efficiency":"at_successful_tackle_percent"}, "▬Possession Adjusted Tackle":{"Involvement":"at_possession_adjusted_tackle"},"Interceptions":{"Overall":"at_interceptions_overall","Productivity":"at_interceptions_avg"},"▬Counteratack Interceptions":{"Productivity":"at_counteratack_interception_avg"},"▬Possession Adjusted Interceptions":{"Productivity":"at_possession_adjusted_interceptions"},"Recoveries":{"Overall":"at_recoveries_overall","Productivity":"at_recoveries_avg"},"▬Opponent Half Recoveries":{"Productivity":"at_opponent_half_recoveries_avg"},	"▬Dangerous Opponent Half Recoveries":{"Productivity":"at_dangerous_opponent_half_recoveries_avg"}, "Clearances":{"Productivity":"at_clearance_avg"}, "Missed Balls":{"Losses":"at_missed_balls_avg"},"Shot Blocking":{"Overall":"at_shot_block_overall","Involvement":"at_shot_block_avg","Productivity":"at_shot_block_avg_won","Losses":"at_shot_block_avg_lost","Efficiency":"at_shot_block_percent"}, "Fouls": {"Losses":"at_fouls_avg","Efficiency":"at_yellow_cards_per_foul"}, "Bookings":{"Overall":"at_bookings_overall"}, "▬Yellow Cards":{"Losses":"at_yellow_cards_avg"},"▬Red Cards":{"Losses":"at_red_cards_avg"}, "▬Direct Red Cards":{"Losses":"at_direct_red_cards_avg"} },
	
	
	"DUELS":{"Defensive Duels":{"Overall":"at_defensive_duels_overall","Involvement":"at_defensive_duels_avg","Productivity":"at_defensive_duels_avg_won","Losses":"at_defensive_duels_avg_lost","Efficiency":"at_defensive_duels_won"}, "Offensive Duels":{"Overall":"at_offensive_duels_overall","Involvement":"at_offensive_duels_avg","Productivity":"at_offensive_duels_avg_won","Losses":"at_offensive_duels_avg_lost","Efficiency":"at_offensive_duels_won"}, "Aerial Duels":{"Overall":"at_aerial_duels_overall","Involvement":"at_aerial_duels_avg","Productivity":"at_aerial_duels_avg_won","Losses":"at_aerial_duels_avg_lost","Efficiency":"at_aerial_duels_won"}, "Field Aerial Duels":{"Overall":"at_field_aerial_duels_overall","Involvement":"at_field_aerial_duels_avg","Productivity":"at_field_aerial_duels_avg_won","Losses":"at_field_aerial_duels_avg_lost","Efficiency":"at_field_aerial_duels_won"}, "Pressing Duels":{"Involvement":"at_pressing_duels_avg"}, "Loose Ball Duels":{"Involvement": "at_loose_ball_duels_avg"}  },

	"AERIAL":{"Aerial Duels":{"Overall":"at_aerial_duels_overall","Involvement":"at_aerial_duels_avg","Productivity":"at_aerial_duels_avg_won","Losses":"at_aerial_duels_avg_lost","Efficiency":"at_aerial_duels_won"}, "Field Aerial Duels":{"Overall":"at_field_aerial_duels_overall","Involvement":"at_field_aerial_duels_avg","Productivity":"at_field_aerial_duels_avg_won","Losses":"at_field_aerial_duels_avg_lost","Efficiency":"at_field_aerial_duels_won"}, "Head Shots":{"Overall":"at_head_shots_overall","Involvement":"at_head_shots_avg","Productivity":"at_head_shots_avg_on_target","Losses":"at_head_shots_avg_off_target","Efficiency":"at_head_shots_on_target_percent"}, "Head Goals":{"Overall":"at_head_goals_overall","Productivity":"at_head_goals_avg","Efficiency":"at_head_goals_conversion_percent"}  }, 
	
	"SET PIECES":{"Free Kicks":{"Involvement":"at_free_kicks_taken_avg"}, "Direct Free Kicks":{"Overall":"at_direct_free_kicks_taken_overall","Involvement":"at_direct_free_kicks_taken_avg","Productivity":"at_direct_free_kicks_taken_avg_won","Losses":"at_direct_free_kicks_taken_avg_lost","Efficiency":"at_direct_free_kicks_on_target_percent"},"Corners":{"Involvement":"at_corners_taken_avg"}, "Penalties":{"Overall":"at_penalties_overall","Involvement":"at_penalties_taken_avg","Efficiency":"at_penalties_conversion_percent"} }, 
	
	"GOALKEEPING":{"Saves":{"Overall":"at_shots_against_overall","Involvement":"at_shots_against_avg","Productivity":"at_shots_against_saved","Losses":"at_shots_against_not_saved","Efficiency":"at_save_percent"}, "▬Saves with Reflex":{"Overall":"at_save_with_reflex_overall","Involvement":"at_save_with_reflex_avg","Productivity":"at_shots_against_saved_with_reflex","Losses":"at_shots_against_not_saved_with_reflex","Efficiency":"at_save_with_reflex_percent"}, "▬Super Save":{"Productivity":"at_super_save_avg"}, "Conceded Goals":{"Overall":"at_conceded_goals_overall","Losses":"at_conceded_goals_avg","Efficiency":"at_clean_sheets"}, "▬Easy Conceded Goals":{"Losses":"at_easy_conceded_goal_avg"}, "▬Far Conceded Goals":{"Losses":"at_far_conceded_goals_avg"}, "▬NearConceded Goals":{"Losses":"at_near_conceded_goals_avg"}, "Control of Area": {"Overall":"at_goalkeeper_exits_overall","Involvement":"at_goalkeeper_exits_avg","Productivity":"at_goalkeeper_exits_avg_won","Losses":"at_goalkeeper_exits_avg_lost","Efficiency":"at_successful_goalkeeper_exits_percent"}, "▬Punch":{"Overall":"at_goalkeeper_punch_overall","Involvement":"at_goalkeeper_punch_avg","Productivity":"at_goalkeeper_punch_avg_won","Losses":"at_goalkeeper_punch_avg_lost","Efficiency":"at_goalkeeper_punch_accuracy"}, "▬Claim":{"Involvement":"at_goalkeeper_claim_avg"},"▬Claim to Punch": {"Involvement":"at_goalkeeper_claim_to_punch"}, "GK Aerial Duels":{"Overall":"at_gk_aerial_duels_overall","Involvement":"at_gk_aerial_duels_avg","Productivity":"at_gk_aerial_duels_avg_won","Losses":"at_gk_aerial_duels_avg_lost","Efficiency":"gk_aerial_duels_won"}, "GK Reliability":{"Overall":"at_gk_reliability_overall"}  }
	
	};
	
	
	
	
    this.attrClassicOverAllArray = {
	"PASSING":{"Passing":"at_main_cat_passing_overall","Passes":"at_passes_overall","Assists":"at_assists_overall","Short-Medium Passes":"at_short_medium_pass_overall","Long Passes":"at_long_passes_overall","Key Passes":"at_key_passes_overall","Smart Passes":"at_smart_passes_overall","Through Passes":"at_through_passes_overall","Crosses":"at_crosses_overall","Pass to Penalty Area":"at_pass_to_penalty_area_overall","Passes to Final Third":"at_passes_to_final_third_overall","Forward Passes":"at_forward_passes_overall","Vertical Passes":"at_vertical_passes_overall","Back Passes":"at_back_passes_overall"},
	"OFFENSIVE":{"Offensive":"at_main_cat_offensive_overall","Successful Attacking Actions":"at_successful_attacking_actions_avg","Received Passes":"at_received_pass_overall","Linkup Plays":"at_linkup_plays_overall","Touches in Box":"at_touch_in_box_avg","Ball Entry in Final Third":"at_ball_entry_in_final_third_avg","Caught Offside":"at_offsides_avg","Possession Losses":"at_losses_overall","Accelerations":"at_accelerations_avg","Offensive Duels":"at_offensive_duels_overall","Dribbles":"at_dribbles_overall","Shooting":"at_shots_overall","Shots Near Corner":"at_shot_to_near_corner_overall","Shots Far Corner":"at_shot_to_far_corner_overall","Head Shots":"at_head_shots_overall","Finishing":"at_goals_overall","Heading":"at_head_goals_overall"},
	"DEFENSIVE":{"Defensive":"at_main_cat_defensive_overall","Successful Defensive Actions":"at_successful_defensive_actions_avg","Defensive Duels":"at_defensive_duels_overall","Tackling":"at_tackle_overall","Interceptions":"at_interceptions_overall","Recoveries":"at_recoveries_overall","Clearances":"at_clearance_avg","Missed Balls":"at_missed_balls_avg","Shot Blocking":"at_shot_block_overall","Fouls":"at_fouls_avg","Bookings":"at_bookings_overall"},
	"DUELS":{"Duels":"at_main_cat_duels_overall","Defensive Duels":"at_defensive_duels_overall","Offensive Duels":"at_offensive_duels_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall","Pressing Duels":"at_pressing_duels_avg","Loose Ball Duels":"at_loose_ball_duels_avg"},
	"AERIAL":{"Aerial":"at_main_cat_aerial_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall","Head Shots":"at_head_shots_overall","Heading":"at_head_goals_overall"},
	"SET PIECES":{"Set Pieces":"at_main_cat_set_pieces_overall","Free Kicks":"at_free_kicks_taken_avg","Direct Free Kicks":"at_direct_free_kicks_taken_overall","Corners":"at_corners_taken_avg","Penalties":"at_penalties_overall"},
	"GOALKEEPING":{"Goalkeepting":"at_main_cat_goalkeeping_overall","Saves":"at_shots_against_overall","Reflexes":"at_save_with_reflex_overall","Conceded Goals":"at_conceded_goals_overall","Control of Area":"at_goalkeeper_exits_overall","Punch":"at_goalkeeper_punch_overall","GK Aerial Duels":"at_gk_aerial_duels_overall","GK Reliability":"at_gk_reliability_overall"}
	};
	
	
	this.attrBehaviourTypeArray = {
	"OVERALL":{"Passing":{"Passing Overall":"at_main_cat_passing_overall","Passes":"at_passes_overall","Assists":"at_assists_overall","Short-Medium Passes":"at_short_medium_pass_overall","Long Passes":"at_long_passes_overall","Key Passes":"at_key_passes_overall","Smart Passes":"at_smart_passes_overall","Through Passes":"at_through_passes_overall","Crosses":"at_crosses_overall","Pass to Penalty Area":"at_pass_to_penalty_area_overall","Passes to Final Third":"at_passes_to_final_third_overall","Forward Passes":"at_forward_passes_overall","Vertical Passes":"at_vertical_passes_overall","Back Passes":"at_back_passes_overall"}, "Offensive":{ "Offensive Overall":"at_main_cat_offensive_overall","Received Passes":"at_received_pass_overall","Linkup Plays":"at_linkup_plays_overall","Possession Losses":"at_losses_overall","Offensive Duels":"at_offensive_duels_overall","Dribbles":"at_dribbles_overall","Shooting":"at_shots_overall","Shots Near Corner":"at_shot_to_near_corner_overall","Shots Far Corner":"at_shot_to_far_corner_overall","Head Shots":"at_head_shots_overall","Finishing":"at_goals_overall","▬Heading":"at_head_goals_overall"}, "Defensive":{"Defensive Overall":"at_main_cat_defensive_overall","Defensive Duels":"at_defensive_duels_overall","Tackling":"at_tackle_overall","Interceptions":"at_interceptions_overall","Recoveries":"at_recoveries_overall","Shot Blocking":"at_shot_block_overall","Bookings":"at_bookings_overall"}, "Duels":{"Duels Overall":"at_main_cat_duels_overall","Defensive Duels":"at_defensive_duels_overall","Offensive Duels":"at_offensive_duels_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall"}, "Aerial":{"Aerial Overall":"at_main_cat_aerial_overall","Aerial Duels":"at_aerial_duels_overall","Field Aerial Duels":"at_field_aerial_duels_overall","Head Shots":"at_head_shots_overall","Head Goals":"at_head_goals_overall"}, "Set Pieces":{"Set Pieces Overall":"at_main_cat_set_pieces_overall","Direct Free Kicks":"at_direct_free_kicks_taken_overall","Penalties":"at_penalties_overall"}, "Goalkeeping":{"Goalkeeping Overall":"at_main_cat_goalkeeping_overall","Saves":"at_shots_against_overall","▬Saves with Reflex":"at_save_with_reflex_overall","Conceded Goals":"at_conceded_goals_overall","Control of Area":"at_goalkeeper_exits_overall","▬Punch":"at_goalkeeper_punch_overall","GK Aerial Duels":"at_gk_aerial_duels_overall","GK Reliability":"at_gk_reliability_overall"}  }, 
	
	
	"INVOLVEMENT":{ "Passing":{"Short-Medium Passes":"at_short_medium_pass_avg","Long Passes":"at_long_passes_avg","Key Passes":"at_key_passes_avg","Smart Passes":"at_smart_passes_avg","Through Passes":"at_through_passes_avg","Crosses":"at_crosses_avg","Pass to Penalty Area":"at_pass_to_penalty_area_avg","Passes to Final Third":"at_passes_to_final_third_avg","Forward Passes":"at_forward_passes_avg","Vertical Passes":"at_vertical_passes_avg","Back Passes":"at_back_passes_avg"}, "Offensive":{"Involvement Overall":"at_behavior_involvement_offensive_overall","Linkup Plays":"at_linkup_plays_avg","Touches in Box":"at_touch_in_box_avg","Offensive Duels":"at_offensive_duels_avg","Dribbles":"at_dribbles_avg","Shooting":"at_shots_avg","Shots Near Corner":"at_shot_to_near_corner_avg","Shots Far Corner":"at_shot_to_far_corner_avg","Head Shots":"at_head_shots_avg"}, "Defensive":{"Involvement Overall":"at_behavior_involvement_defensive_overall","Defensive Duels":"at_defensive_duels_avg","Tackling":"at_tackle_avg","Shot Blocking":"at_shot_block_avg"},"Duels":{"Involvement Overall":"at_behavior_involvement_duels_overall","Defensive Duels":"at_defensive_duels_avg","Offensive Duels":"at_offensive_duels_avg","Aerial Duels":"at_aerial_duels_avg","Field Aerial Duels":"at_field_aerial_duels_avg","Pressing Duels":"at_pressing_duels_avg","Loose Ball Duels":"at_loose_ball_duels_avg"}, "Aerial":{"Involvement Overall":"at_behavior_involvement_aerial_overall","Aerial Duels":"at_aerial_duels_avg","Field Aerial Duels":"at_field_aerial_duels_avg","Head Shots":"at_head_shots_avg"},"Set Pieces":{"Involvement Overall":"at_behavior_involvement_set_pieces_overall","Free Kicks":"at_free_kicks_taken_avg","Direct Free Kicks":"at_direct_free_kicks_taken_avg","Corners":"at_corners_taken_avg","Penalties":"at_penalties_taken_avg"}, "Goalkeeping":{"Involvement Overall":"at_behavior_involvement_goalkeeping_overall","Saves":"at_shots_against_avg","▬Saves with Reflex":"at_save_with_reflex_avg","Control of Area":"at_goalkeeper_exits_avg","▬Punch":"at_goalkeeper_punch_avg","▬Claim":"at_goalkeeper_claim_avg","▬Claim to Punch":"at_goalkeeper_claim_to_punch","GK Aerial Duels":"at_gk_aerial_duels_avg"}  }, 
	
	
	"PRODUCTIVITY":{"Passing":{"Productivity Overall":"at_behavior_productivity_passing_overall","Passes":"at_passes_avg_won","Assists":"at_assists_avg","▬Shot  Assists":"at_shot_on_goal_assists_avg","Short-Medium Passes":"at_short_medium_pass_avg_won","Long Passes":"at_long_passes_won","Key Passes":"at_key_passes_avg_won","Smart Passes":"at_smart_passes_avg_won","Through Passes":"at_through_passes_avg_won","Crosses":"at_crosses_avg_won","Pass to Penalty Area":"at_pass_to_penalty_area_avg_won","Passes to Final Third":"at_passes_to_final_third_avg_won","Forward Passes":"at_forward_passes_avg_won","Vertical Passes":"at_vertical_passes_avg_won","Back Passes":"at_back_passes_avg_won"}, "Offensive":{"Productivity Overall":"at_behavior_productivity_offensive_overall","Successful attacking Actions":"at_successful_attacking_actions_avg","Received Passes":"at_received_pass_avg","▬Received Dangerous Passes":"at_received_dangerous_pass_avg","▬Received Long Passes":"at_received_long_pass_avg","Linkup Plays":"at_linkup_plays_avg_won","Ball Entry in Final Third":"at_ball_entry_in_final_third_avg","Accelerations":"at_accelerations_avg","Offensive Duels":"at_offensive_duels_avg_won","Dribbles":"at_dribbles_avg_won","Shooting":"at_shots_avg_on_target","Shots Near Corner":"at_shot_to_near_corner_avg_on_target","Shots Far Corner":"at_shot_to_far_corner_avg_on_target","Head Shots":"at_head_shots_avg_on_target","Finishing":"at_goals_avg","▬Heading":"at_head_goals_avg","▬Non Penalty Goal":"at_non_penalty_goal_avg"},"Defensive":{"Productivity Overall":"at_behavior_productivity_defensive_overall","Succ Defensive Actions":"at_successful_defensive_actions_avg","Defensive Duels":"at_defensive_duels_avg_won","Tackling":"at_tackle_avg_won","Interceptions":"at_interceptions_avg","▬Counteratack Interceptions":"at_counteratack_interception_avg","▬Possession Adjusted Interceptions":"at_possession_adjusted_interceptions","Recoveries":"at_recoveries_avg","▬Opponent Half Recoveries":"at_opponent_half_recoveries_avg","▬Dangerous Opponent Half Recoveries":"at_dangerous_opponent_half_recoveries_avg","Clearances":"at_clearance_avg","Shot Blocking":"at_shot_block_avg_won"}, "Duels":{"Productivity Overall":"at_behavior_productivity_duels_overall","Defensive Duels":"at_defensive_duels_avg_won","Offensive Duels":"at_offensive_duels_avg_won","Aerial Duels":"at_aerial_duels_avg_won","Field Aerial Duels":"at_field_aerial_duels_avg_won"}, "Aerial":{"Productivity Overall":"at_behavior_productivity_aerial_overall","Aerial Duels":"at_aerial_duels_avg_won","Field Aerial Duels":"at_field_aerial_duels_avg_won","Head Shots":"at_head_shots_avg_on_target","Head Goals":"at_head_goals_avg"}, "Set Pieces":{"Direct Free Kicks":"at_direct_free_kicks_taken_avg_won"}, "Goalkeeping":{"Productivity Overall":"at_behavior_productivity_goalkeeping_overall","Saves":"at_shots_against_saved","▬Saves with Reflex":"at_shots_against_saved_with_reflex","▬Super Save":"at_super_save_avg","Control of Area":"at_goalkeeper_exits_avg_won","▬Punch":"at_goalkeeper_punch_avg_won","GK Aerial Duels":"at_gk_aerial_duels_avg_won"}   }, 
	
	
	"LOSSES":{"Passing":{"Losses Overall":"at_behavior_losses_passing_overall","Passes":"at_passes_avg_lost","Short-Medium Passes":"at_short_medium_pass_avg_lost","Long Passes":"at_long_passes_lost","Key Passes":"at_key_passes_avg_lost","Smart Passes":"at_smart_passes_avg_lost","Through Passes":"at_through_passes_avg_lost","Crosses":"at_crosses_avg_lost","Pass to Penalty Area":"at_pass_to_penalty_area_avg_lost","Passes to Final Third":"at_passes_to_final_third_avg_lost","Forward Passes":"at_forward_passes_avg_lost","Vertical Passes":"at_vertical_passes_avg_lost","Back Passes":"at_back_passes_avg_lost"}, "Offensive":{"Losses Overall":"at_behavior_losses_offensive_overall","Linkup Plays":"at_linkup_plays_avg_lost","Caught Offside":"at_offsides_avg","Possession Losses":"at_losses_avg","▬Own Half Losses":"at_own_half_losses_avg","▬Dangerous Own Half  Losses":"at_dangerous_own_half_losses_avg","Offensive Duels":"at_offensive_duels_avg_lost","Dribbles":"at_dribbles_avg_lost","Shooting":"at_shots_avg_off_target","Shots Near Corner":"at_shot_to_near_corner_avg_off_target","Shots Far Corner":"at_shot_to_far_corner_avg_off_target","Head Shots":"at_head_shots_avg_off_target"}, "Defensive":{"Losses Overall":"at_behavior_losses_defensive_overall","Defensive Duels":"at_defensive_duels_avg_lost","Tackling":"at_tackle_avg_lost","Missed Balls":"at_missed_balls_avg","Shot Blocking":"at_shot_block_avg_lost","Fouls":"at_fouls_avg","Yellow Cards":"at_yellow_cards_avg","Red Cards":"at_red_cards_avg","Direct Red Cards":"at_direct_red_cards_avg"}, "Duels":{"Losses Overall":"at_behavior_losses_duels_overall","Defensive Duels":"at_defensive_duels_avg_lost","Offensive Duels":"at_offensive_duels_avg_lost","Aerial Duels":"at_aerial_duels_avg_lost","Field Aerial Duels":"at_field_aerial_duels_avg_lost"}, "Aerial":{"Losses Overall":"at_behavior_losses_aerial_overall","Aerial Duels":"at_aerial_duels_avg_lost","Field Aerial Duels":"at_field_aerial_duels_avg_lost","Head Shots":"at_head_shots_avg_off_target"}, "Set Pieces":{"Direct Free Kicks":"at_direct_free_kicks_taken_avg_lost"}, "Goalkeeping":{"Losses Overall":"at_behavior_losses_goalkeeping_overall","Saves":"at_shots_against_not_saved","▬Saves with Reflex":"at_shots_against_not_saved_with_reflex","Conceded Goals":"at_conceded_goals_avg","▬Easy Conceded Goals":"at_easy_conceded_goal_avg","▬Far Conceded Goals":"at_far_conceded_goals_avg","▬NearConceded Goals":"at_near_conceded_goals_avg","Control of Area":"at_goalkeeper_exits_avg_lost","▬Punch":"at_goalkeeper_punch_avg_lost","GK Aerial Duels":"at_gk_aerial_duels_avg_lost"}   }, 
	
	
	"EFFICIENCY":{"Passing":{"Efficiency Overall":"at_behavior_efficiency_passing_overall","Passes":"at_accurate_passes_percent","Assists":"at_successful_shot_assists_percent","Short-Medium Passes":"at_accurate_short_medium_pass_percent","Long Passes":"at_successful_long_passes_percent","Key Passes":"at_successful_key_passes_percent","Smart Passes":"at_accurate_smart_passes_percent","Through Passes":"at_successful_through_passes_percent","Crosses":"at_accurate_crosses_percent","Pass to Penalty Area":"at_accurate_pass_to_penalty_area_percent","Passes to Final Third":"at_accurate_passes_to_final_third_percent","Forward Passes":"at_successful_forward_passes_percent","Vertical Passes":"at_successful_vertical_passes_percent","Back Passes":"at_successful_back_passes_percent"}, "Offensive":{"Efficiency Overall":"at_behavior_efficiency_offensive_overall","Linkup Plays":"at_successful_linkup_plays_percent","Offensive Duels":"at_offensive_duels_won","Dribbles":"at_successful_dribbles_percent","Shooting":"at_shots_on_target_percent","▬Shots per Goal":"at_shot_on_target_per_goal","Shots Near Corner":"at_shot_to_near_corner_on_target_percent","Shots Far Corner":"at_shot_to_far_corner_on_target_percent","Head Shots":"at_head_shots_on_target_percent","▬Head Shots per Goal":"at_head_shot_on_target_per_goal","Finishing":"at_goal_conversion_percent","▬Heading":"at_head_goals_conversion_percent"}, "Defensive":{"Efficiency Overall":"at_behavior_efficiency_defensive_overall","Defensive Duels":"at_defensive_duels_won","Tackling":"at_successful_tackle_percent","Shot Blocking":"at_shot_block_percent","Fouls":"at_yellow_cards_per_foul"}, "Duels":{"Efficiency Overall":"at_behavior_efficiency_total_duels_overall","Defensive Duels":"at_defensive_duels_won","Offensive Duels":"at_offensive_duels_won","Aerial Duels":"at_aerial_duels_won","Field Aerial Duels":"at_field_aerial_duels_won"}, "Aerial":{"Efficiency Overall":"at_behavior_efficiency_aerial_overall","Aerial Duels":"at_aerial_duels_won","Field Aerial Duels":"at_field_aerial_duels_won","Head Shots":"at_head_shots_on_target_percent","Head Goals":"at_head_goals_conversion_percent"}, "Set Pieces":{"Direct Free Kicks":"at_direct_free_kicks_on_target_percent","Penalties":"at_penalties_conversion_percent"},"Goalkeeping":{"Efficiency Overall":"at_behavior_efficiency_goalkeeping_overall","Saves":"at_save_percent","▬Saves with Reflex":"at_save_with_reflex_percent","Conceded Goals":"at_clean_sheets","Control of Area":"at_successful_goalkeeper_exits_percent","▬Punch":"at_goalkeeper_punch_accuracy","GK Aerial Duels":"gk_aerial_duels_won"}  }
	
	};
	
	
	this.attrBehaviourCategoryArray = { 
	
	"PASSING":{"Overall":{"Passing Overall":"at_main_cat_passing_overall",
"Passes":"at_passes_overall",
"Assists":"at_assists_overall",
"Short-Medium Passes":"at_short_medium_pass_overall",
"Long Passes":"at_long_passes_overall",
"Key Passes":"at_key_passes_overall",
"Smart Passes":"at_smart_passes_overall",
"Through Passes":"at_through_passes_overall",
"Crosses":"at_crosses_overall",
"Pass to Penalty Area":"at_pass_to_penalty_area_overall",
"Passes to Final Third":"at_passes_to_final_third_overall",
"Forward Passes":"at_forward_passes_overall",
"Vertical Passes":"at_vertical_passes_overall",
"Back Passes":"at_back_passes_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_passing_overall",
"Passes":"at_passes_avg",
"▬Shot  Assists":"at_shot_assists_avg",
"Short-Medium Passes":"at_short_medium_pass_avg",
"Long Passes":"at_long_passes_avg",
"Key Passes":"at_key_passes_avg",
"Smart Passes":"at_smart_passes_avg",
"Through Passes":"at_through_passes_avg",
"Crosses":"at_crosses_avg",
"Pass to Penalty Area":"at_pass_to_penalty_area_avg",
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
"Pass to Penalty Area":"at_pass_to_penalty_area_avg_won",
"Passes to Final Third":"at_passes_to_final_third_avg_won",
"Forward Passes":"at_forward_passes_avg_won",
"Vertical Passes":"at_vertical_passes_avg_won",
"Back Passes":"at_back_passes_avg_won"}, "Losses":{ "Losses Overall":"at_behavior_losses_passing_overall",
"Passes":"at_passes_avg_lost",
"Short-Medium Passes":"at_short_medium_pass_avg_lost",
"Long Passes":"at_long_passes_lost",
"Key Passes":"at_key_passes_avg_lost",
"Smart Passes":"at_smart_passes_avg_lost",
"Through Passes":"at_through_passes_avg_lost",
"Crosses":"at_crosses_avg_lost",
"Pass to Penalty Area":"at_pass_to_penalty_area_avg_lost",
"Passes to Final Third":"at_passes_to_final_third_avg_lost",
"Forward Passes":"at_forward_passes_avg_lost",
"Vertical Passes":"at_vertical_passes_avg_lost",
"Back Passes":"at_back_passes_avg_lost" }, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_passing_overall",
"Passes":"at_accurate_passes_percent",
"Assists":"at_successful_shot_assists_percent",
"Short-Medium Passes":"at_accurate_short_medium_pass_percent",
"Long Passes":"at_successful_long_passes_percent",
"Key Passes":"at_successful_key_passes_percent",
"Smart Passes":"at_accurate_smart_passes_percent",
"Through Passes":"at_successful_through_passes_percent",
"Crosses":"at_accurate_crosses_percent",
"Pass to Penalty Area":"at_accurate_pass_to_penalty_area_percent",
"Passes to Final Third":"at_accurate_passes_to_final_third_percent",
"Forward Passes":"at_successful_forward_passes_percent",
"Vertical Passes":"at_successful_vertical_passes_percent",
"Back Passes":"at_successful_back_passes_percent"}}, 
	
	
	"OFFENSIVE":{ "Overalls":{"Offensive Overall":"at_main_cat_offensive_overall",
"Successful attacking Actions":"at_successful_attacking_actions_avg",
"Received Passes":"at_received_pass_overall",
"Linkup Plays":"at_linkup_plays_overall",
"Touches in Box":"at_touch_in_box_avg",
"Ball Entry in Final Third":"at_ball_entry_in_final_third_avg",
"Caught Offside":"at_offsides_avg",
"Possession Losses":"at_losses_overall",
"Accelerations":"at_accelerations_avg",
"Offensive Duels":"at_offensive_duels_overall",
"Dribbles":"at_dribbles_overall",
"Shooting":"at_shots_overall",
"Shots Near Corner":"at_shot_to_near_corner_overall",
"Shots Far Corner":"at_shot_to_far_corner_overall",
"Head Shots":"at_head_shots_overall",
"Finishing":"at_goals_overall",
"▬Heading":"at_head_goals_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_offensive_overall",
"Linkup Plays":"at_linkup_plays_avg",
"Touches in Box":"at_touch_in_box_avg",
"Offensive Duels":"at_offensive_duels_avg",
"Dribbles":"at_dribbles_avg",
"Shooting":"at_shots_avg",
"Shots Near Corner":"at_shot_to_near_corner_avg",
"Shots Far Corner":"at_shot_to_far_corner_avg",
"Head Shots":"at_head_shots_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_offensive_overall",
"Successful attacking Actions":"at_successful_attacking_actions_avg",
"Received Passes":"at_received_pass_avg",
"▬Received Dangerous Passes":"at_received_dangerous_pass_avg",
"▬Received Long Passes":"at_received_long_pass_avg",
"Linkup Plays":"at_linkup_plays_avg_won",
"Ball Entry in Final Third":"at_ball_entry_in_final_third_avg",
"Accelerations":"at_accelerations_avg",
"Offensive Duels":"at_offensive_duels_avg_won",
"Dribbles":"at_dribbles_avg_won",
"Shooting":"at_shots_avg_on_target",
"Shots Near Corner":"at_shot_to_near_corner_avg_on_target",
"Shots Far Corner":"at_shot_to_far_corner_avg_on_target",
"Head Shots":"at_head_shots_avg_on_target",
"Finishing":"at_goals_avg",
"▬Heading":"at_head_goals_avg",
"▬Non Penalty Goal":"at_non_penalty_goal_avg"}, "Losses":{"Losses Overall":"at_behavior_losses_offensive_overall",
"Linkup Plays":"at_linkup_plays_avg_lost",
"Caught Offside":"at_offsides_avg",
"Possession Losses":"at_losses_avg",
"▬Own Half Losses":"at_own_half_losses_avg",
"▬Dangerous Own Half  Losses":"at_dangerous_own_half_losses_avg",
"Offensive Duels":"at_offensive_duels_avg_lost",
"Dribbles":"at_dribbles_avg_lost",
"Shooting":"at_shots_avg_off_target",
"Shots Near Corner":"at_shot_to_near_corner_avg_off_target",
"Shots Far Corner":"at_shot_to_far_corner_avg_off_target",
"Head Shots":"at_head_shots_avg_off_target"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_offensive_overall",
"Linkup Plays":"at_successful_linkup_plays_percent",
"Offensive Duels":"at_offensive_duels_won",
"Dribbles":"at_successful_dribbles_percent",
"Shooting":"at_shots_on_target_percent",
"▬Shots per Goal":"at_shot_on_target_per_goal",
"Shots Near Corner":"at_shot_to_near_corner_on_target_percent",
"Shots Far Corner":"at_shot_to_far_corner_on_target_percent",
"Head Shots":"at_head_shots_on_target_percent",
"▬Head Shots per Goal":"at_head_shot_on_target_per_goal",
"Finishing":"at_goal_conversion_percent",
"▬Heading":"at_head_goals_conversion_percent"} }, 
	
	
	"DEFENSIVE":{"Overalls":{"Defensive Overall":"at_main_cat_defensive_overall",
"Successful Defensive Actions":"at_successful_defensive_actions_avg",
"Defensive Duels":"at_defensive_duels_overall",
"Tackling":"at_tackle_overall",
"Interceptions":"at_interceptions_overall",
"Recoveries":"at_recoveries_overall",
"Clearances":"at_clearance_avg",
"Missed Balls":"at_missed_balls_avg",
"Shot Blocking":"at_shot_block_overall",
"Fouls":"at_fouls_avg",
"Bookings":"at_bookings_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_defensive_overall",
"Defensive Duels":"at_defensive_duels_avg",
"Tackling":"at_tackle_avg",
"Shot Blocking":"at_shot_block_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_defensive_overall",
"Succ Defensive Actions":"at_successful_defensive_actions_avg",
"Defensive Duels":"at_defensive_duels_avg_won",
"Tackling":"at_tackle_avg_won",
"Interceptions":"at_interceptions_avg",
"▬Counteratack Interceptions":"at_counteratack_interception_avg",
"▬Possession Adjusted Interceptions":"at_possession_adjusted_interceptions",
"Recoveries":"at_recoveries_avg",
"▬Opponent Half Recoveries":"at_opponent_half_recoveries_avg",
"▬Dangerous Opponent Half Recoveries":"at_dangerous_opponent_half_recoveries_avg",
"Clearances":"at_clearance_avg",
"Shot Blocking":"at_shot_block_avg_won"}, "Losses":{"Losses Overall":"at_behavior_losses_defensive_overall",
"Defensive Duels":"at_defensive_duels_avg_lost",
"Tackling":"at_tackle_avg_lost",
"Missed Balls":"at_missed_balls_avg",
"Shot Blocking":"at_shot_block_avg_lost",
"Fouls":"at_fouls_avg",
"Yellow Cards":"at_yellow_cards_avg",
"Red Cards":"at_red_cards_avg",
"Direct Red Cards":"at_direct_red_cards_avg"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_defensive_overall",
"Defensive Duels":"at_defensive_duels_won",
"Tackling":"at_successful_tackle_percent",
"Shot Blocking":"at_shot_block_percent",
"Fouls":"at_yellow_cards_per_foul"},  },
	
	
	"DUELS":{ "Overalls":{"Duels Overall":"at_main_cat_duels_overall",
"Defensive Duels":"at_defensive_duels_overall",
"Offensive Duels":"at_offensive_duels_overall",
"Aerial Duels":"at_aerial_duels_overall",
"Field Aerial Duels":"at_field_aerial_duels_overall",
"Pressing Duels":"at_pressing_duels_avg",
"Loose Ball Duels":"at_loose_ball_duels_avg"}, "Involvement":{ "Involvement Overall":"at_behavior_involvement_duels_overall",
"Defensive Duels":"at_defensive_duels_avg",
"Offensive Duels":"at_offensive_duels_avg",
"Aerial Duels":"at_aerial_duels_avg",
"Field Aerial Duels":"at_field_aerial_duels_avg",
"Pressing Duels":"at_pressing_duels_avg",
"Loose Ball Duels":"at_loose_ball_duels_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_duels_overall",
"Defensive Duels":"at_defensive_duels_avg_won",
"Offensive Duels":"at_offensive_duels_avg_won",
"Aerial Duels":"at_aerial_duels_avg_won",
"Field Aerial Duels":"at_field_aerial_duels_avg_won"}, "Losses":{"Losses Overall":"at_behavior_losses_duels_overall",
"Defensive Duels":"at_defensive_duels_avg_lost",
"Offensive Duels":"at_offensive_duels_avg_lost",
"Aerial Duels":"at_aerial_duels_avg_lost",
"Field Aerial Duels":"at_field_aerial_duels_avg_lost"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_total_duels_overall",
"Defensive Duels":"at_defensive_duels_won",
"Offensive Duels":"at_offensive_duels_won",
"Aerial Duels":"at_aerial_duels_won",
"Field Aerial Duels":"at_field_aerial_duels_won"} }, 
	
	"AERIAL":{ "Overalls":{"Aerial Overall":"at_main_cat_aerial_overall",
"Aerial Duels":"at_aerial_duels_overall",
"Field Aerial Duels":"at_field_aerial_duels_overall",
"Head Shots":"at_head_shots_overall",
"Head Goals":"at_head_goals_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_aerial_overall",
"Aerial Duels":"at_aerial_duels_avg",
"Field Aerial Duels":"at_field_aerial_duels_avg",
"Head Shots":"at_head_shots_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_aerial_overall",
"Aerial Duels":"at_aerial_duels_avg_won",
"Field Aerial Duels":"at_field_aerial_duels_avg_won",
"Head Shots":"at_head_shots_avg_on_target",
"Head Goals":"at_head_goals_avg"}, "Losses":{"Losses Overall":"at_behavior_losses_aerial_overall",
"Aerial Duels":"at_aerial_duels_avg_lost",
"Field Aerial Duels":"at_field_aerial_duels_avg_lost",
"Head Shots":"at_head_shots_avg_off_target"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_aerial_overall",
"Aerial Duels":"at_aerial_duels_won",
"Field Aerial Duels":"at_field_aerial_duels_won",
"Head Shots":"at_head_shots_on_target_percent",
"Head Goals":"at_head_goals_conversion_percent"} }, 
	
	
	"SET PIECES":{"Overalls":{"Set Pieces Overall":"at_main_cat_set_pieces_overall",
"Free Kicks":"at_free_kicks_taken_avg",
"Direct Free Kicks":"at_direct_free_kicks_taken_overall",
"Corners":"at_corners_taken_avg",
"Penalties":"at_penalties_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_set_pieces_overall",
"Free Kicks":"at_free_kicks_taken_avg",
"Direct Free Kicks":"at_direct_free_kicks_taken_avg",
"Corners":"at_corners_taken_avg",
"Penalties":"at_penalties_taken_avg"}, "Productivity":{"Direct Free Kicks":"at_direct_free_kicks_taken_avg_won"}, "Losses":{"Direct Free Kicks":"at_direct_free_kicks_taken_avg_lost"},"Efficiency":{"Direct Free Kicks":"at_direct_free_kicks_on_target_percent",
"Penalties":"at_penalties_conversion_percent"}  }, 
	
	
	"GOALKEEPING":{"Overalls":{"Goalkeeping Overall":"at_main_cat_goalkeeping_overall",
"Saves":"at_shots_against_overall",
"▬Saves with Reflex":"at_save_with_reflex_overall",
"Conceded Goals":"at_conceded_goals_overall",
"Control of Area":"at_goalkeeper_exits_overall",
"▬Punch":"at_goalkeeper_punch_overall",
"GK Aerial Duels":"at_gk_aerial_duels_overall",
"GK Reliability":"at_gk_reliability_overall"}, "Involvement":{"Involvement Overall":"at_behavior_involvement_goalkeeping_overall",
"Saves":"at_shots_against_avg",
"▬Saves with Reflex":"at_save_with_reflex_avg",
"Control of Area":"at_goalkeeper_exits_avg",
"▬Punch":"at_goalkeeper_punch_avg",
"▬Claim":"at_goalkeeper_claim_avg",
"▬Claim to Punch":"at_goalkeeper_claim_to_punch",
"GK Aerial Duels":"at_gk_aerial_duels_avg"}, "Productivity":{"Productivity Overall":"at_behavior_productivity_goalkeeping_overall",
"Saves":"at_shots_against_saved",
"▬Saves with Reflex":"at_shots_against_saved_with_reflex",
"▬Super Save":"at_super_save_avg",
"Control of Area":"at_goalkeeper_exits_avg_won",
"▬Punch":"at_goalkeeper_punch_avg_won",
"GK Aerial Duels":"at_gk_aerial_duels_avg_won"}, "Losses":{"Losses Overall":"at_behavior_losses_goalkeeping_overall",
"Saves":"at_shots_against_not_saved",
"▬Saves with Reflex":"at_shots_against_not_saved_with_reflex",
"Conceded Goals":"at_conceded_goals_avg",
"▬Easy Conceded Goals":"at_easy_conceded_goal_avg",
"▬Far Conceded Goals":"at_far_conceded_goals_avg",
"▬NearConceded Goals":"at_near_conceded_goals_avg",
"Control of Area":"at_goalkeeper_exits_avg_lost",
"▬Punch":"at_goalkeeper_punch_avg_lost",
"GK Aerial Duels":"at_gk_aerial_duels_avg_lost"}, "Efficiency":{"Efficiency Overall":"at_behavior_efficiency_goalkeeping_overall",
"Saves":"at_save_percent",
"▬Saves with Reflex":"at_save_with_reflex_percent",
"Conceded Goals":"at_clean_sheets",
"Control of Area":"at_successful_goalkeeper_exits_percent",
"▬Punch":"at_goalkeeper_punch_accuracy",
"GK Aerial Duels":"gk_aerial_duels_won"} } 
	
	}
	

  }
}
