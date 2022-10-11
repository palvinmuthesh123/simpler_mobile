import { Injectable } from '@angular/core';
import * as Janus from '../../assets/janus';
import { AppVarsService } from 'src/app/services/app-vars.service';

declare var Janus;

@Injectable({
  providedIn: 'root'
})
export class WebRTCStreamService {
  server:any;
  sessions:any={};
  isUsingPlugin:boolean;
  showAlerts:boolean;
  streamServer:any;
  service:any;
  saveData:boolean; //if this is set to true, it will not connect to Video/screen to save data.
  saveDataAudio:boolean; 

  constructor(public appVars: AppVarsService) {

    this.server = this.appVars.globals.janusHOST;
    this.isUsingPlugin = false;
    this.showAlerts = false;

    this.streamServer='';

    this.saveData = false; //if this is set to true, it will not connect to Video/screen to save data.
    this.saveDataAudio = false; 
   }

   doInit = function () {
/*
    if (!this.appVars.globals.janusHOSTStream) { this.appVars.globals.janusHOSTStream=this.appVars.globals.janusHOST;}
    if (server) {
      this.streamServer=server;
      this.server = 'https://'+server+'/janus';   
    }
    else {
      this.server = this.appVars.globals.janusHOSTStream;
    }
  */
    // this.turnServers = this.appVars.globals.iceServers;
    
   //console.log("turnServers" + JSON.stringify(this.turnServers));
    //console.log("streaming doInit called: server:"+JSON.stringify(this.service.server));
     Janus.init(
        {
            debug: true,
            callback: function () {
                // if (!Janus.isWebrtcSupported()) {
                //     alert("No WebRTC support... ");
                //     return;
                // }
                
            }
        });
  }

  newSession = function (sessID) {
    console.log("****** webRTCStreamService new sessID:" + sessID);

    var sess = {
        janus: null,//gateway session
        screentest: null,//handle
        started: false,
        uid: null,
        ctype: '', //screen or av
        streamID: null,
        localstream: null,
        connected: false
    };
    this.service.sessions[sessID] = sess;
    this.service.isReloading=false;

    console.log("****** " + JSON.stringify(sess));

}


  }
