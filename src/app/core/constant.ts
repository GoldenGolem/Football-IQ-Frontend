export class AppSettings {
   // public static API_ENDPOINT='https://footballiq-vidhema.herokuapp.com/api/';
   // public static API_ENDPOINT='https://football-api-prod.herokuapp.com/api/';
   // public static API_ENDPOINT='https://footballiq-api.herokuapp.com/api/';
   public static API_ENDPOINT='http://localhost:3000/api/';
   
   public static NO_PLAYER_SELECTED = 'No Player(s) selected.';
   public static LOADING_PLAYERS = 'Please wait while we are loading Players.....';
   public static SNACK_BAR_ACTION = 'Close';


   /* Watchlist Messages */
   
   public static WATCHLIST_SUCCESS_MESSAGE = 'Player(s) added successfully into Watchlist';
   public static DELETE_WATCHLIST_CONFIRM = 'Are you sure to delete these players from your Watchlist?';
   public static DELETE_WATCHLIST_SUCCESS = 'Selected Player(s) Successfully Removed from Watchlist';

/* Shortlist Messages */
   
   public static SHORTLIST_SUCCESS_MESSAGE = 'Player(s) added successfully into Shortlist';
   public static ADD_SHORTLIST_CONFIRM = 'If Selected Player(s) are not in the Watchlist, they will be added to Watchlist as well. Proceed.?';
   public static DELETE_SHORTLIST_CONFIRM = 'Are you sure to delete these players from your Shortlist?';
   public static DELETE_SHORTLIST_SUCCESS = 'Selected Player(s) Successfully Removed from Shortlist';
   
   
   /* Viewlist Messages */
   
   public static VIEWLIST_SUCCESS_MESSAGE = 'View saved successfully';
   public static NO_FILTER_SELECTED = 'No Filter(s) selected.';

/* Target Messages */
   
   public static TARGET_SUCCESS_MESSAGE = 'Player(s) added successfully into Target';
   public static DELETE_TARGET_CONFIRM = 'Are you sure to delete these players from your Target?';
   public static DELETE_TARGET_SUCCESS = 'Selected Player(s) Successfully Removed from Target';



}