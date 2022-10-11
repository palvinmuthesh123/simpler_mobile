import { Injectable } from '@angular/core';
import * as SockJS from '../../assets/sockjs';
import { AppVarsService } from 'src/app/services/app-vars.service';
import { SharedService } from 'src/app/services/shared.service';
import { WebRTCStreamService } from 'src/app/services/web-rtcstream.service';
import { WebRTCAudioService } from 'src/app/services/web-rtcaudio.service';
import { WebRTCService } from 'src/app/services/web-rtc.service';
declare var SockJS;
@Injectable({
  providedIn: 'root'
})
export class ChatModelService {
  _apiV:any;
  _socketConnected:boolean;
  _everConnected:boolean;
  _autoReconnect:boolean; //set this to false to prevent aut-reconnection
  _autoReconnectInterval:any;

  roster:[]=[]; //holds the user roster
  presroster:[]=[]; //holds the presenters
  msgs:[]=[]; //holds chat msgs
  alertMsgs:[]=[]; //holds alert msgs
  userCount:any;
  chatMsgCount:any;
  alertMsgCount:any;
  showRoster:boolean;
  showRosterCount:boolean;
  effectMuted:boolean; //mute "pling" chat msg sound
  roomState:{}={}; //room state obj, like who is presenting, are wer recording, etc passed from server...
  closedMsg:any; 

  pairCode:any;
  myemail:any;

  roomID:any;
  nick:any;
  email:any;
  userPW:any;
  perms:any;
  isFreeTrial:boolean;
  tagline:any;
  avatar:any;
  uid:any;
  pub_id:any;
  pub_idScreen:any;
  prevUID:any;
  isLoggedIn:any;
  isSessionClosed:any;
  login:any={};
  jwtToken:any; //session token
  jwtTokenSite:any; //ptr site token
  streamServer:any;;
  nonPresenter:boolean; //sets to true for non presenter admins..

  _uid:any;

  //av related
  micMuted:boolean;
  camMuted:boolean;
  audioMuted:boolean; //mutes conf audio
  isRecording:boolean;
  isTalking:any; //talking indicator
  isTalkingArr:[] = [];
  screenPresenters:[] = []; //presenters sharing their screen
  audioStatus:any; //disconnected, connected, connecting...
  screenshareOn:boolean;
  videoshareOn:boolean;
  screenshareLaunching:boolean;
  vertoConnected:boolean;
  webcamListenerAdded:boolean;
  isConnectedToScreen:boolean;
  currPeresenter:any;
  audioRoomID:any;

  presPorts:[] = [];
  downBand:any;
  upBand:any;

  watchingScreenOf:any;
  watchingScreenOfUID:any;
  watchingScreenOfEmail:any;

  isDetachedChat:boolean; //was

  doConnectToStreaming:boolean;
  
  //mpeg stremer
  useMPGAudioService:boolean; 
  useMPGScreenService:boolean; 
  mpegStreamServer:any;
  audioRoomSecret:any;
  
  webRTCSession:any;

  //private chat
  privChatLogs:{}={}; //chat log arrays go here...
  _al:any;

  isWebRTCReconnecting:boolean;
  webRTCReconnectTimer:any;
  webRTCConnected:boolean;
  sessID:any;
  socket:any;
  is_msie:any;
  
  constructor(public appVars: AppVarsService, public shared: SharedService, public webrtc: WebRTCService, public webrtcaudio: WebRTCAudioService, public webrtcstream: WebRTCStreamService) {
    this._apiV = "1.0.0";
    this._socketConnected = false;
    this._everConnected = false;
    this._autoReconnect = true; //set this to false to prevent aut-reconnection
    this.userCount = 0;
    this.chatMsgCount = 0;
    this.alertMsgCount = 0;
    this.showRoster = true;
    this.showRosterCount = true;
    this.effectMuted = false; //mute "pling" chat msg sound
    this.closedMsg = "The session is closed. Please Wait for a presenter to open it...";
    this.pairCode = '';
    this.myemail = '';

    this.roomID = "";
    this.nick = "";
    this.email = "email@example.com";
    this.userPW = "";
    this.perms = "r";
    this.isFreeTrial=false;
    this.tagline = "";
    this.avatar = "";
    this.uid = "";
    this.pub_id = null;
    this.pub_idScreen = null;
    this.prevUID = "";
    this.isLoggedIn = false;
    this.isSessionClosed = false;

    this.login.isLoggedIn = false;
    this.jwtToken = null; //session token
    this.jwtTokenSite = null; //ptr site token
    this.streamServer = '';
    this.nonPresenter = false; //sets to true for non presenter admins..

    this._uid = "uid";

    //av related
    this.micMuted = true;
    this.camMuted = true;
    this.audioMuted = false; //mutes conf audio
    this.isRecording = false;
    this.isTalking = ""; //talking indicator
    this.isTalkingArr = [];
    this.screenPresenters = []; //presenters sharing their screen
    this.audioStatus = "disconnected"; //disconnected, connected, connecting...
    this.screenshareOn = false;
    this.videoshareOn = false;
    this.screenshareLaunching = false;
    this.vertoConnected = false;
    this.webcamListenerAdded = false;
    this.isConnectedToScreen = false;
    this.currPeresenter = null;
    this.audioRoomID = 0;

    this.downBand = 10000;
    this.upBand = 10000;

    this.watchingScreenOf = null;
    this.watchingScreenOfUID = null;
    this.watchingScreenOfEmail = null;

    this.isDetachedChat = false; //was

    this.doConnectToStreaming = false;
    
    //mpeg stremer
    this.useMPGAudioService = false; 
    this.useMPGScreenService = false; 
    this.mpegStreamServer = '';
    this.audioRoomSecret = '1234';
    this.webRTCSession = null;
    this._al = localStorage.getItem('st_token');
    this.isWebRTCReconnecting = false;
    this.webRTCReconnectTimer = null;
    this.webRTCConnected = false;
    this.is_msie = (navigator.userAgent.toLowerCase().indexOf('msie') > -1) || (/Trident/i.test(navigator.userAgent)) || (/Edge\/12./i.test(navigator.userAgent)) || (/MSIE/i.test(navigator.userAgent));
    
    this.shared.getObservable().subscribe((data) => {
      console.log('Data received', data);
    });
    const _uid = "uid";
   }

   connection = (url:any, roomID:any,service:any, chatService:any, appVars:any) => {
    // console.log(chatService);
     let chatServices = chatService;
     let broadCastservice = this.shared;
     let app_Vars = this.appVars;
     let webrtcstream = this.webrtcstream;
     this.socket = new SockJS(url);
     this.socket.onopen = () => {
           console.log('Socket connected...'+url);
 
           chatServices._socketConnected = true;
           if (chatServices._autoReconnectInterval) {
             //  $interval.cancel(_autoReconnectInterval);
             clearInterval(this._autoReconnectInterval);
             chatServices._autoReconnectInterval = null;
           }
 
           if (chatServices._everConnected) {
             broadCastservice.sendDataPost( {Name:"reconnected"});     
             console.log("on open event: reconnected fired.");
             chatServices.sendLoginToRoom("join", true);
 
           }
           else {
             chatServices._everConnected = true;
               console.log("on open event: connected fired.");
               broadCastservice.sendDataPost( {Name:"connected"});     
               //do login
               chatServices.sendLoginToRoom("join", false);
           }              
 
       };
     
       this.socket.onmessage = (event) => {
         var evt = JSON.parse(event.data);
         console.log('onmessage', evt);
 
         var type = evt.type;
         switch (type) {
                       case "loggedIn":
                         console.log("service on join. data=" + JSON.stringify(evt.data));
                         var uid = evt.data.uid;
                         var streamServer = JSON.stringify(evt.data.streamServer);
                         if(streamServer){
                           var strArr = streamServer.split("|");
                           chatServices.streamServer = strArr[0];
                           chatServices.doConnectToStreaming = true;
                           console.log("service on join. data=" + chatServices.streamServer);
                         
                         }
                         else{
                           chatServices.doConnectToStreaming = false;              
                         }
                         //mpegservice
                         var mpegStreamServer=evt.data.mpegStreamServer;
                         if (mpegStreamServer){
                             var str_Arr = mpegStreamServer.split("|");
 
                             chatServices.mpegStreamServer = str_Arr[0];
                           // mpegStreamService.setServer( chatServices.mpegStreamServer );
                             /*
                             if (appVars.globals.useMPGAudioService){
                                 lg("******  mp3 audio ********");
                                  service.useMPGAudioService = true; 
                             }
                             if (appVars.globals.useMPGScreenService){
                                 lg("******  jpeg screens ********");
                                service.useMPGScreenService = true; 
                             }
                            */                           
                         }
                         //get perms
                         chatServices.perms = evt.data.p;
                         chatServices.uid = uid;
                         if (evt.data.nonP) {
                           chatServices.nonPresenter = evt.data.nonP;
                         }
                         //Special case for mobile app
                         
                         if (app_Vars.globals.isM && chatServices.isPresenter()){
                         //  lg("forcing nonPresenter admin on mobile app..");
                           service.nonPresenter = true;
                       }
                       chatServices._uid = uid;
                       if (chatServices.prevUID == null || chatServices.prevUID == "") {
                         chatServices.prevUID = uid;
                       }
                       chatServices.isLoggedIn=true;
                      
                       if (app_Vars.sessData.rosterVisibleToViewers) {
                         chatServices.showRoster = true;
                       }
                     
                       else {
                         chatServices.showRoster = false;
                       }
                     
                       if (app_Vars.sessData.rosterCountVisibleToViewers) {
                         chatServices.showRosterCount = true;
                       }
                       else {
                         chatServices.showRosterCount = false;
                       }
                     
                       if (chatServices.isPresenter()) {
                         chatServices.showRoster=true;
                         chatServices.showRosterCount = true;
                       }
                     
                       console.log("service on join. prevUID=" + chatServices.prevUID+". showRoster="+chatServices.showRoster);
                       broadCastservice.sendDataPost( {Name:"loggedIn", Value:uid});     
                       //  $rootScope.$broadcast('loggedIn', uid);
                     //  $rootScope.$broadcast('userPermsChanged', service.isPresenter());
                       if (chatServices.isPresenter() && (chatServices.nonPresenter || chatServices.__forcedStreamServer)){
                         chatServices.nonPresenter=true;
                           //lg("issuing nonPresenterLoggedIn!");
                         //  $rootScope.$broadcast('nonPresenterLoggedIn');
                       }
                       break;
                       
                       case "getAlertlog":

                        chatServices.alertMsgs = evt.data;
                        chatServices.alertMsgCount = chatServices.alertMsgs.length;
                        chatServices.alertMsgs.forEach( msg =>{
                          chatServices.processMessageLink(msg);
                        });

                        broadCastservice.sendDataPost( {Name:"getAlertlog", Value:evt.chatlog});     
                        broadCastservice.sendDataPost( {Name:"getAlertlogList", Value:evt.data});     

                        if (chatServices.isDetachedChat && window.localStorage) {
                          chatServices.sendWindowMsg('alertLog', JSON.stringify(service.alertMsgs));
                        }
                        break;

                        case "imageLink":
                          console.log("alert recvd:" + JSON.stringify(evt.data));
                          var msg = evt.data;

                              //update the avatar
                              msg.avatar = chatServices.getUserByUID(msg.uid).avatar;
                              chatServices.processMessageLink(msg);    
                              chatServices.alertMsgs.unshift(msg);
  
                          if (type == 'alertLink') {
                              broadCastservice.sendDataPost( {Name:"alertLink", Value:msg});     
                              return;
                          }
                          else {
                            broadCastservice.sendDataPost( {Name:"alertMsg", Value:msg});     
                          }
                          if (chatServices.isDetachedChat && window.localStorage) {
                              chatServices.sendWindowMsg('alertMsg', JSON.stringify(msg));
                          }
                          
                          break;

                          case "deleteAlert":
                            //$timeout(function () {
                              chatServices.alertMsgs.splice(parseInt(evt.data), 1);
                              broadCastservice.sendDataPost( {Name:"deleteAlert", Value:evt.data});                                    
                            //});
                          break;

                          case "cmd":

                            if (evt.data == "clearChatLog") {
                                chatServices.msgs.splice(0, chatServices.msgs.length);
    
                            }
                            if (evt.data == "clearAlertLog") {
                              chatServices.alertMsgs.splice(0, chatServices.alertMsgs.length);
    
                            }
                            broadCastservice.sendDataPost( {Name:"cmd", Value:evt.data});                                    
                            break;

                            case "loggedInServer":
                              var uid = evt.data;
                              chatServices.uid = uid;
                              chatServices._uid = uid;
                              broadCastservice.sendDataPost( {Name:"loggedIn"});     
                              // $rootScope.$broadcast('loggedIn');
                              break;
    
                          case 'setPorts':
                              console.log("set ports: " + JSON.stringify(evt.data));
                              chatServices.presPorts = evt.data.ports;
                              chatServices.pub_id = evt.data.pub_id;
                              chatServices.pub_idScreen = evt.data.pub_idScreen;
                              chatServices.audioRoomCreationLock=!!evt.data.audioRoomCreationLock;
    
                              if (chatServices.presPorts) {
    
                                app_Vars.globals.janusAudioPort = chatServices.presPorts[0];
                                app_Vars.globals.janusScreenPort = chatServices.presPorts[1];
                                  if (chatServices.presPorts.length > 2) {
                                    app_Vars.globals.HLSAudioPort = chatServices.presPorts[2];
                                    app_Vars.globals.HLSVideoPort = chatServices.presPorts[3];
                                    app_Vars.globals.HLSHost = evt.data.hlsHOST;
                                      //WAS initFS(service.perms);
                                  } 
                        }
                              
                          break;            
                          case "getRoster":
                            //WAS angular.copy(evt.roster, service.roster);
                            console.log("GET ROSTER");
                            //clear it first
                            chatServices.roster.splice(0, chatServices.roster.length);
                            chatServices.presroster.splice(0, chatServices.presroster.length);
                            chatServices.allUsers = [];
                            if (Object.prototype.toString.call(evt.data) != '[object Array]') {
                                //convert to array
    
                                for (var user in evt.data) {
                                    chatServices.allUsers.push(evt.data[user]);
                            }
    
                            }
                            else {
                                //already an arr
                                chatServices.allUsers = evt.chatServices.roster;
                            }
                            chatServices.userCount = chatServices.allUsers.length;
                            var dataLength = parseInt(chatServices.allUsers.length);
    
                            for (var i = 0; i < dataLength; i++) {
                                var u = chatServices.allUsers[i];
                                //if (u.uid==service.uid) { continue; } //skip me 
                                if (u.perms == "a" || u.perms == "o") {
                                   console.log("getRoster adding presenter " + u.nick + ". uid=" + u.uid);
                                    if (!u.hasOwnProperty('isScreenSharing')) { u.isScreenSharing = false; }
                                    if (!u.hasOwnProperty('isVideoSharing')) { u.isVideoSharing = false; }
                                    chatServices.presroster.push(u)
                                }
                                else {
                                    //lg("getRoster adding user " + u.nick + ". uid=" + u.uid);
                                    chatServices.roster.push(u);
                                }
                            }
                            chatServices.userCount = chatServices.roster.length + chatServices.presroster.length;
                            broadCastservice.sendDataPost( {Name:"getRoster"});                           
                            broadCastservice.sendDataPost( {Name:"getPresenter", Value:chatServices.presroster});                                                  
                            broadCastservice.sendDataPost( {Name:"getRosterList", Value:chatServices.roster});                           
                            /*  
                            $rootScope.$broadcast('getRoster');
                            if (app_Vars.globals.useHLS) {
                                service.send("getScreenPresenters", null); //req list of screen presneters
                            }
                            if (service.isPresenter()){
                                $rootScope.$broadcast('sharedVideoPlayerCmd', {cmd: 'initP'});
                            }
                            else {
                                $rootScope.$broadcast('sharedVideoPlayerCmd', {cmd: 'initV'});
                            }
                            */
                            break;
                            case "userJoin":
                              //roster.push(data);
                             // console.log("userJoin received=" + JSON.stringify(evt));
                              //see if user UID already there...
                              //find the user
                              evt = evt.data;
                              var l, users;
                              var found = false;
                              var ros = chatServices.roster;
                              if (evt.perms == "a" || evt.perms == "o" || evt.perms == "p") {
                                  ros = chatServices.presroster;
                              }
                              for (l = 0; l < ros.length; l++) {
                                  users = ros[l];
                                  if (users.uid === evt.uid) {
                                    console.log("userJoin found old user entry updating. uid: "+evt.uid);
                                  found=true;
                                  ros[l] = evt;
                                  /*
                                  $rootScope.$apply(function () {
                                          ros[i] = evt;
                                  });
                                  */
                                      break;
                              }
                              }
                              if (!found) {
                                console.log("userJoin adding new user user uid: " + evt.uid + ". nick:" + evt.nick + ". persm=" + evt.perms);
                                  ros.push(evt)
                                /*
                                  $rootScope.$apply(function () {
                                      ros.push(evt)
                                  });
                                  */
                              }
                            //  service.userCount = service.roster.length + service.presroster.length;
                              if (!found){
                                broadCastservice.sendDataPost( {Name:"getPresenter", Value:chatServices.presroster});                                                  
                                broadCastservice.sendDataPost( {Name:"getRosterList", Value:chatServices.roster}); 
                                broadCastservice.sendDataPost( {Name:"userJoin", Value:evt});                                                                                   
                               //   $rootScope.$broadcast('userJoin', evt);
                              }
                              else {
                                broadCastservice.sendDataPost( {Name:"recalcUserCount"});                                                                                   
                                //  $rootScope.$broadcast('recalcUserCount');
                              }
                             
                              break;
                          case "userLeft":
                            //lg("userLeft received=" + JSON.stringify(evt.data));
                            //find the user
                            var p, userz;
                            var found = false;
                            var regUsersChecked = false;
                            //1st check presenters
                            var ros = chatServices.presroster;
                            while (true) {
                                for (p = 0; p < ros.length; p++) {
                                    userz = ros[p];
                                    if (userz.uid === evt.data) {
                                        //lg("userLeft found user. deleting from roster");
                                found = true;
                              //  $rootScope.$apply(function () {
                                            ros.splice(p, 1);
                                    for (var j = 0; j < chatServices.screenPresenters.length; j++) {
                                        if (chatServices.screenPresenters[j].uid == userz.uid) {
                                          chatServices.screenPresenters.splice(j, 1);
                                          //  lg("getscreenSharingUsers REMOVE screenShare for user:" + userz.nick);
                                            if (chatServices.watchingScreenOfUID == userz.uid) {
                                                if (chatServices.watchingScreenOfType=='screen'){
                                                  broadCastservice.sendDataPost( {Name:"screenBroadcastEnd"});                                                                                   

                                                    chatServices.savedScreenUser=null;
                                                    if (userz.uid == chatServices.screenLockedOnPres){
                                                      //  lg("screenLockedOnPres left...clearing lock");
                                                        chatServices.screenLockedOnPres='';
                                                        broadCastservice.sendDataPost( {Name:"screenLockedOnPresClear"});                                                                                   

                                                    }
                                                    
                                                }
                                                else {
                                                  broadCastservice.sendDataPost( {Name:"videoBroadcastEnd"});                                                                                                                                     
                                                }
                                                //need to autoselect next pres if one exists
                                                if (chatServices.screenPresenters.length > 0) {
                                                  chatServices.watchingScreenOf = null;
                                                  chatServices.watchingScreenOfUID = null;
                                                    var newPress = chatServices.screenPresenters[0];
                                                    chatServices.callScreenOfUserWEBRTC(newPress);
                                                    //WAS service.callScreenOfUser(newPress.nick,newPress.uid,newPress.email);
                                                }
                                                else {
                                                  chatServices.watchingScreenOf = null;
                                                  chatServices.watchingScreenOfUID = null;
                                                }
                                            }
                                        }
                                    }
    
                              //  });
                                chatServices.userCount = chatServices.roster.length + chatServices.presroster.length;

                                      broadCastservice.sendDataPost( {Name:"userLeft", Value:{uid: evt.data, isP: ros==chatServices.presroster}});                                                  
                                      broadCastservice.sendDataPost( {Name:"getPresenter", Value:chatServices.presroster});                                                  
                                      broadCastservice.sendDataPost( {Name:"getRosterList", Value:chatServices.roster});                                                       
                                      if (ros==chatServices.presroster) {
                                          chatServices.processTalkingIndicator();
                                        }
                               
                                return;
                            }
                            }
                                if (!found && regUsersChecked) {
                                    //lg("userLeft did not find user: " + evt.data);
                                    chatServices.userCount = chatServices.roster.length + chatServices.presroster.length;
                                   broadCastservice.sendDataPost( {Name:"userLeft", Value:{uid: evt.data, isP: ros==chatServices.presroster}});                                                  
                                   broadCastservice.sendDataPost( {Name:"getPresenter", Value:chatServices.presroster});                                                  
                                   broadCastservice.sendDataPost( {Name:"getRosterList", Value:chatServices.roster});                                                       
                                    return;
                                }
                                else {
                                    ros = chatServices.roster; //do users roster now
                                    regUsersChecked = true;
                                }
                            }
                            broadCastservice.sendDataPost( {Name:"getPresenter", Value:chatServices.presroster});                                                  
                            broadCastservice.sendDataPost( {Name:"getRosterList", Value:chatServices.roster});                                                                                   
                          //  service.userCount = service.roster.length + service.presroster.length;
                            broadCastservice.sendDataPost( {Name:"userLeft", Value:{uid: evt.data, isP: ros==chatServices.presroster}});                                                                                  

                            break;    
            }
         }
 
       this.socket.onclose = (reason) => {
           console.log(reason);
           if (chatServices._autoReconnectInterval != null) {
            //reconnect loop...
            console.log("RECONNECT failed... retrying...");
            return;
        }
        chatServices.screenLockedOnPres='';
        broadCastservice.sendDataPost( {Name:"screenLockedOnPresClear"});                                                                                  

        chatServices._socketConnected = false;
        chatServices.isLoggedIn = false;
        if (chatServices.uid != null) { chatServices.prevUID = chatServices.uid; }
        //see if we were scresnahring...
        if (chatServices.isPresenter() && !chatServices.nonPresenter){
        //  chatServices.autoReconnectScreenshare=this.webrtc.isSharingScreenAndUp(chatServices.uid+"-p");
          chatServices.autoUnmuteAudio=!chatServices.micMuted;
          chatServices.doHangup(chatServices.autoUnmuteAudio || chatServices.autoReconnectScreenshare); //c
        }
        else {
          chatServices.doHangup(false); //close media
        }
        
        
        broadCastservice.sendDataPost( {Name:"close"});                                                                                         
        //console.log("on close event. reason:" + (reason != null ? reason : 'n/a'));
        if (chatServices._autoReconnect) {
          chatServices.autoReconnect();
        }           
       };
     
       chatServices.isPresenter =  () => {
         if (this.perms == "a" || this.perms == "o") return true; else return false;
       }

       chatServices.autoReconnect = () => {
        if (chatServices._autoReconnect && chatServices._autoReconnectInterval == null) {
          chatServices._autoReconnectInterval = setInterval(
              function () {
                  console.log("auto-reconnecting to: " + chatServices._url + ".  _socketConnected=" + chatServices._socketConnected);
                  if (!chatServices._socketConnected) {
                    chatServices.connection(chatServices._url);
                  }
              }
              , 3000);
        }        
      } 

       chatServices.sendLoginToRoom = (cmd, isReconnect) => {
 
         var bnd= localStorage.getItem("bnd");
         if (bnd==chatServices.roomID){
             alert("You have been banned from this room. Please contact your administrator...");
             return;
         }
 
         appVars.nick=chatServices.nick;
         var u = {
             "roomID": chatServices.roomID,
             "uid": chatServices.uid,
             "prevUID": chatServices.prevUID,
             "nick": chatServices.nick,
             "email": chatServices.email,
             "pw": chatServices.userPW,
             "perms": chatServices.perms,
             "ft": chatServices.isFreeTrial,
             "tagline": chatServices.tagline,
             "avatar": chatServices.avatar,
             "salt": "",
             "__al": chatServices._al,
             "jwtToken": chatServices.jwtToken,
             "jwtTokenSite": chatServices.jwtTokenSite,
             "cver": app_Vars.globals.ver,
             "isM": app_Vars.globals.isM,
             "apiV": chatServices._apiV
         };
         
         if (isReconnect) {
           //  u.reconnect = true;
         }
         console.log("sending login. u=" + JSON.stringify(u)+". nonPresenter:"+chatServices.nonPresenter);
         /*
         if (app_Vars.userInfo) {
             u.ui=appVars.userInfo;
         }*/
   
         chatServices.send(cmd, u);
         } 
 
         chatServices.send =  (type, data) => {
           console.log("sending. type:" + type + ". data=" + JSON.stringify(data));
           var m = { 'type': type, 'data': data };
           this.socket.send(JSON.stringify(m));
         };

         chatServices.close = function () {

          if (this.socket != null) {
              try {
                chatServices._autoReconnect = false;//we want to disconnect
                chatServices._everConnected = false;
                  if (chatServices._autoReconnectInterval) { 
                    clearInterval(chatServices._autoReconnectInterval);
                    chatServices._autoReconnectInterval = null; }
                  this.socket.close();
              }
              catch (err) { }
              this.isLoggedIn = false;
              
          }
            chatServices.isLoggedIn = false;
            chatServices.screenLockedOnPres='';
            broadCastservice.sendDataPost( {Name:"screenLockedOnPresClear"});                                                                                  
            chatServices.doHangup(); //close media
        }         

        chatServices.sendWindowMsg = (type, msg) => {
          var o = {
            ts: Date.now(),
            msg: msg
           }
          console.log('sendWindowMsg type:' + type + ". is_msie:" + chatServices.is_msie + ".  msg: " + msg);
          if (chatServices.is_msie) {
              try { window.localStorage.setItem('detached.chat.detrealIE.' + type, JSON.stringify(o)); } catch (err) { }
              try { window.localStorage.setItem('detached.chat.det.isie', type); } catch (err) { }
          }
          else {
              try { window.localStorage.setItem('detached.chat.det.' + type, JSON.stringify(o)); } catch (err) { }
          }
        }

        chatServices.processMessageLink = (msg) => {
          var str=msg.text.toLowerCase();
          if (str.indexOf('.png') !== -1 || str.indexOf('.jpg') !== -1 
              || str.indexOf('.jpeg') !== -1 || str.indexOf('.gif') !== -1) {
              msg.isImgLink=true;
              msg.imgURL=msg.text.match(/\bhttp[^ ]+/ig)[0];
              //msg.imgURL=msg.text.match(/\bhttps?:\/\/\S+/gi);
          }         
        }          
  

      }

      send =  (type, data) => {
        console.log("sending. type:" + type + ". data=" + JSON.stringify(data));
        var m = { 'type': type, 'data': data };
        this.socket.send(JSON.stringify(m));
      };

      isPresenter =  () => {
        if (this.perms == "a" || this.perms == "o") return true; else return false;
      }

      processMessageLink = (msg) => {
        var str=msg.text.toLowerCase();
        if (str.indexOf('.png') !== -1 || str.indexOf('.jpg') !== -1 
            || str.indexOf('.jpeg') !== -1 || str.indexOf('.gif') !== -1) {
            msg.isImgLink=true;
            msg.imgURL=msg.text.match(/\bhttp[^ ]+/ig)[0];
            //msg.imgURL=msg.text.match(/\bhttps?:\/\/\S+/gi);
        }         
      }

      sendWindowMsg = (type, msg) => {
        var o = {
          ts: Date.now(),
          msg: msg
      }
        console.log('sendWindowMsg type:' + type + ". is_msie:" + this.is_msie + ".  msg: " + msg);
        if (this.is_msie) {
            try { window.localStorage.setItem('detached.chat.detrealIE.' + type, JSON.stringify(o)); } catch (err) { }
            try { window.localStorage.setItem('detached.chat.det.isie', type); } catch (err) { }
        }
        else {
            try { window.localStorage.setItem('detached.chat.det.' + type, JSON.stringify(o)); } catch (err) { }
        }
      }

      close = function () {

        if (this.socket != null) {
            try {
              this._autoReconnect = false;//we want to disconnect
              this._everConnected = false;
                if (this._autoReconnectInterval) { 
                  clearInterval(this._autoReconnectInterval);
                  this._autoReconnectInterval = null; }
                this.socket.close();
            }
            catch (err) { }
            this.isLoggedIn = false;            
        }
        this.isLoggedIn = false;
        this.screenLockedOnPres='';
        this.shared.sendDataPost( {Name:"screenLockedOnPresClear"});                                                                                  
        this.doHangup(); //close media
    }      

    doHangup = function (keepAlive) {
      this.isLoggedIn = false;
     // lg("chatModel.doHUP()... keepAlive:"+keepAlive);

      this.shouldReconnectVerto = false; //disable auto-reconnect
      if (this.appVars.globals.useHLS) {
        this.screenPresenters.splice(0, this.screenPresenters.length);
        this.screenshareLaunching = this.screenshareOn = false;
        this.isTalking = "";
        this.camMuted = this.micMuted = true;
        this.watchingScreenOf = null;
        this.watchingScreenOfUID = null;
        this.watchingScreenOfEmail = null;
          //tell nav bar to recalc/reset
          this.shared.sendDataPost( {Name:"reconnected"});                                                                                  
          this.shared.sendDataPost( {Name:"screenBroadcastEnd"});                                                                                  

          this.isLoggedIn = false;
          return;
      }

      if (this.isPresenter() && !this.nonPresenter) {
        //this.webrtc.doHup(this.uid + "-p");
          if (!keepAlive){
            this.autoReconnectScreenshare=false;
            this.autoUnmuteAudio=false;
          }
        //  this.webrtcaudio.doHup(this.uid);
          if (this.doConnectToStreaming) {
          //  this.webrtcstream.doHup('av');
          //  this.webrtcstream.doHup('screen');
          }
      }
      else {
          if (this.doConnectToStreaming) {
          //  this.webrtcstream.doHup('av');
          //  this.webrtcstream.doHup('screen');
          }
          else {
            //  this.webrtc.doHup(this.uid + "-v");
            //  this.webrtcaudio.doHup(this.uid);
          }
         
      }
      if (this.isWebRTCReconnecting) {
        this.isWebRTCReconnecting = false;
    
          if (this.webRTCReconnectTimer) {
              clearInterval(this.webRTCReconnectTimer);
              this.webRTCReconnectTimer = null;
          }
      }
      this.screenPresenters.splice(0, this.screenPresenters.length);
      this.screenshareLaunching = this.screenshareOn = false;
      this.isTalking = "";
      this.camMuted = this.micMuted = true;
      this.watchingScreenOf = null;
      this.watchingScreenOfUID = null;
      this.watchingScreenOfEmail = null;
      this.watchingScreenOfType = null;

      this.shared.sendDataPost( {Name:"webRTCConnState", Value:"off"});                                                                                  

      //tell nav bar to recalc/reset
      this.shared.sendDataPost( {Name:"reconnected"});                                                                                  
      this.shared.sendDataPost( {Name:"screenBroadcastEnd"});                                                                                  
      this.shared.sendDataPost( {Name:"videosBroadcastEnd"});                                                                                  

      if (this.useMPGScreenService){
        this.mpegStreamService.stopWatchingScreen();
      }
      
      if (this.useMPGAudioService){
        this.mpegStreamService.doHupAudio();
      }

      this.isLoggedIn = false;
   }

    autoReconnect = () => {
      if (this._autoReconnect && this._autoReconnectInterval == null) {
        this._autoReconnectInterval = setInterval(
            function () {
                console.log("auto-reconnecting to: " + this._url + ".  _socketConnected=" + this._socketConnected);
                if (!this._socketConnected) {
                  this.connection(this._url);
                }
            } , 3000);
      }        
    }


    }

