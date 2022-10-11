import { Injectable } from '@angular/core';
import * as Janus from '../../assets/janus';
import { AppVarsService } from 'src/app/services/app-vars.service';

declare var Janus;

@Injectable({
  providedIn: 'root'
})
export class WebRTCService {
  server:any;
  sessions:any={};
  isUsingPlugin:boolean;
  showAlerts:boolean;
  connected:boolean;
  shouldReconnect:boolean;
  isReconnecting:boolean;
  isSharingScreen:boolean;
  resSent:boolean;  
  isInited:boolean;
  service:any;

  constructor(public appVars: AppVarsService) { 
    this.server = this.appVars.globals.janusHOST;

  }

  doInit = function () {
    if (this.appVars.globals.useHSL) {  return;   }

    this.server = this.appVars.globals.janusHOST;
    //this.turnServers = this.appVars.globals.iceServers

    console.log("video doInit called: server:"+this.server)
}


  initailaize(){
		Janus.init({
      debug: true,
      callback: function() {
              // Done!
       var janus = new Janus(
           {
               server: this.server,
               success: function() {

                janus.attach(
                    {
                        plugin: "janus.plugin.streaming",
                        success: function(pluginHandle) {
                          console.log("streaming Plugin attached! (" + pluginHandle.getPlugin() + ", id=" + pluginHandle.getId() + ")");
                            // Plugin attached! 'pluginHandle' is our handle
                        },
                          onmessage: function(msg, jsep) {
                                      console.log("sss");
                                      console.log("streaming "+JSON.stringify(msg));
                                      this.newSession('screen');
                                      // To do further process..
                          },

                          onremotestream: function (stream) {
                              console.log(stream);
                                    //   var vid= document.getElementById('webcamScreen');
                                    //   vid.srcObject=stream;
                                      
                          },
                          oncleanup: function () {

                          }

                  });

               },
               error: function(er) {
                     console.log(er);
               },
               destroyed: function() {
                     console.log('des');
               }
           });

      }
   });

  }


}