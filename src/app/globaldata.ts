import { environment } from '../environments/environment.prod';
export class Globaldata {
  //ver
  appVersion: string = 'v3.0.1';
  clientVersion: string = '3.0.0';
  ptr_server = environment.ptr_server;
  ptr_server_ws = environment.ptr_server_ws;
  server_prefix: string = environment.server_prefix;

  //servers
  apiROOT: string;
  ptrWebROOT: string;
  socketConnected: boolean;
  mediaServerConnected: boolean;

  //media server
  janusHOST: string;
  janusHOSTStream: string;
  forcedStreamServer: string;
  streamServer: string;
  janusRepeaters: [];
  janusRepeaterNames: any[];
  janusFirRate = 5;
  janusBitRate = 512000;
  audioQ: number = 7;
  audioPin = '';
  pub_idScreen = '';
  pub_idWebcam = '';
  //turn
  turnServer = 'flash.protradingroom.com';
  turnUser = 'ptrUser';
  turnPW = 'ptr123';

  //token & state
  passedToken: string; //pased token from URL params/sso
  decodedPassedToken: any;

  sesionToken: string;
  decodedSessionToken: any;
  loggedIn: boolean = false;

  //ids
  sessionID: string;

  //branding
  sessionName: string = 'PTR Session';
  logoURL: string = '/assets/images/ptr_logo.png';
  favicon: string;
  custCSSURL: string;
  loginScreenMSG: string;

  //user stuff
  userName: string;
  userEmail: string;
  userRole: string;
  isPresenter: boolean = false;
  isNonPresenterAdmin: boolean = false;
  profilePic: string = '';

  isTalking: boolean = false;
  isScreenSharing: boolean = false;
  currScreenID: string = '';
  isWebcaming: boolean = false;

  loc: any;
  locStr: string = 'n/a';
  ua: any;
  uaStr: string = 'n/a';

  //server stuff
  chatServers: any[];

  chatLogPageSize: number = 50;
  imgurKeys = ['7e0cf0ac3ac743b', '76da555b63aedda', '80882634473d9ca', '76d3e1592ca560d'];
  //session data
  sessData: any = {
    description: '',
  }; //<--- get loaded from API / DB
  pubSessionData: any; //<--- get loaded from API / DB
  preferences: any = {}; //<--- get loaded from localstorage
  appState: 'loggedOut'; //loggedOut,logginIn, loggedIn,
  roomState: any; //<--- gets sent by the chat server
  roomMediaState: any; //<--- gets sent by the chat server
  roster: any[]; //<--the list of users
  rosterCount: number = 0; //<--the number of users
  chatTabs: any[];
  chatLog: any;
  privChatLog: any = {};
  privChatSearchResults: any[];
  alertsLog: any[];
  chatSearchResults: any[];
  alertsSearchResults: any[];
  user: any;

  //session notes
  sessionNotes: any[];

  // audio / video devices
  audioDeviceID = '';
  videoDeviceID = '';

  //Mobile app FCM stuff
  fcmToken:string='';
}
