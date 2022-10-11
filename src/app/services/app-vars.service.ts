import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppVarsService {
  iceServers:any;
  isMobile = true;
  appVarsURL = "https://chat.simplerdev.com/public/mobile/st_app_vars.json";
  globals = {
    ver: '2.18.371',
    UPDATE_CHAN: 'production',
    janusHOST: 'https://morigin.rooms.simplertrading.com:443/janus',
    APIURL: 'https://chat.simplerdev.com',
    DAILY_FEED:'https://www.simplerdev.com/wp-json/stposts/c1d79a423dc2ca26ca9e4f5c28313394/daily',
    stSSOURL: 'https://www.simplerdev.com/wp-json/st_jwt_auth/v1/', // dev
    forgot : 'https://www.simplerdev.com/',
    useHLS: false,
    audioQ: 7, // def is 4, was 7 for a long time
    isM: true,
    appVersion: 'n/a',
    sessData:{},
    janusHOSTAudio:null,
    chatServerURL:null,
    janusBitRate:null,
    janusFirRate:null,
    janusRepeaters:[],
    janusAudioPort:null,
    janusScreenPort:null,
    HLSAudioPort:null,
    HLSVideoPort:null,
    HLSHost:null
  };
  sessData:any={};
  autoSession = "";
  autoToken = "";

  constructor() {

  }

}