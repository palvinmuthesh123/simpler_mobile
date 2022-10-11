import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { AppVarsService } from 'src/app/services/app-vars.service';
import { AppService } from 'src/app/services/app.service';
import { lg } from '../../utils/logger';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatModelService } from 'src/app/services/chat-model.service';

const $ = (window as any).$;
@Component({
  selector: 'app-room-login',
  templateUrl: './room-login.page.html',
  styleUrls: ['./room-login.page.scss'],
})
export class RoomLoginPage implements OnInit {
  RoomLoginForm:FormGroup;

  // @Input('loginReady') loginReady: boolean = false; // parent sets this to true once all info is loaded on page and we wnable the login button
  roomTitle: string;
  roomImg: string;
  roomID: string;

  browserOK: boolean = true;
  browserOKDismissed: boolean = false;

  rememberMe: boolean = false;
  forgetMe: boolean = false;

  nick: string = '';
  email: string = '';
  emailHash: string = '';

  pw: string = '';
  avatarURL: string;
  token: string = '';

  logginIn: boolean = false;
  showPresenter: boolean = false;

  authMode: string = 'reg'; // reg show login/email,pw: show pw field..  sso: no emal/pw needed, hide email
  showPW: boolean = false;
  hasSTHelpLink: boolean = true;
  strictBrowserMode: boolean = false;

  ChatURL: string;
  // hide avatar options
  avatarOptions = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public appService: AppService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private http: HttpClient,
    private appVars: AppVarsService,
    public chatService: ChatModelService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.roomTitle = this.router.getCurrentNavigation().extras.state.roomTitle;
        this.roomImg = this.router.getCurrentNavigation().extras.state.roomImg;
        this.roomID = this.router.getCurrentNavigation().extras.state.roomID;
        console.log(this.roomImg);
      }
    });

    this.RoomLoginForm = new FormGroup({
      name:new FormControl(),
      tagline:new FormControl(),

    })
    this.RoomLoginForm.get('name').setValue(localStorage.getItem("name"));
    this.RoomLoginForm.get('tagline').setValue(localStorage.getItem("tagline"));
  }

  ngOnInit() {
    // load my info:
    
  }
 
  loginErrorAlert = async (message) => {

    const alert = await this.alertController.create({
      header: 'Login Error',
      message: message || 'Check your input and try again...',
      buttons: ['OK'],
    });

    await alert.present();
  }

  showLoginLoading = async () => {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  hideLoginLoading = async () => {
    await this.loadingController.dismiss();
  }

  loginRoom = async() => {
    this.chatService.roomID = this.roomID;
    this.chatService.email = localStorage.getItem("email");
    this.chatService._al = localStorage.getItem("st_token");
    this.chatService.nick = this.RoomLoginForm.value.name;
    this.chatService.tagline = this.RoomLoginForm.value.tagline;

    const loginURL = this.appVars.globals.APIURL + '/users/v1/users.json';
    const { name, tagline } = this.RoomLoginForm.value;
    const email = window.localStorage.getItem('email');

      window.localStorage.setItem('name', name);
      window.localStorage.setItem('tagline', tagline);    
    
    if (name.length > 1 && !email) {
      this.loginErrorAlert('Please no emails or special chars on the nick');
      return false;
    }
    this.showLoginLoading();
    const loginData = {
      roomID: this.roomID,
      cmd: 'loginChat',
      email,
      code: 'mobileApp',
    };

  
  const login_response = await this.http.post<any>(loginURL, loginData).toPromise()
    .then(res => { return res })
    .catch((err) => { return err });

    console.log('response', login_response);

    if (login_response.uuid) {
      this.hideLoginLoading();

      this.chatService.roomID = login_response.uuid;
      //this.chatService.visitID = login_response.uuid;
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('tagline', tagline);
      this.chatService.isLoggedIn = true;

      this.setSessionVarsFromData(login_response);

      const goToRoom: NavigationExtras = {
        state: {
          ChatURL:login_response.chatServerURL,
          room_id:this.roomID,
          Sess_id:login_response._id,
          auth_Mode:login_response.authMode,
          service : login_response,
        },
      };
      this.ChatURL = this.appVars.globals.APIURL + login_response.chatServerURL;
      if (!this.chatService._socketConnected) {      
        this.chatService.connection(this.ChatURL, this.roomID, login_response, this.chatService, this.appVars);
      }
      this.router.navigate(['room-tabs/screens'], goToRoom);
    } else {
      this.hideLoginLoading();
      this.loginErrorAlert(login_response.message);
      return false;
    }
    return false;
  }
  
  
  getRoomIcon = (iconUrl: string): string => {
    if (iconUrl.match(/\bhttp[^ ]+/gi)) {
      return iconUrl;
    } else {
      return `./assets/${iconUrl}`;
    }
  }

  setSessionVarsFromData = (data:any) =>{
    if (!data || !data.uuid) {
      return;
    }

    this.appVars.sessData = data;
    //sessData was not persisting consistently when put directly into appVars top-level keys
    this.appVars.globals.sessData = data;
    this.chatService.roomID = data.uuid;
    //chatModel.visitID = data.uuid;

    //WAS chatModel.perms = data.perm;
    // chatModel.nick = $scope.nick;
    //chatModel.tagline = $scope.tagline;
    this.chatService.isLoggedIn = true;

    //media server
    if (data.media_server) {
      this.appVars.globals.janusHOST =
        "https://" + data.media_server + ":443/janus";
      this.appVars.globals.janusHOSTAudio =
        "https://" + data.media_server + ":443/janus";
      lg("setting media server to " + data.media_server);
    }

    if (data.chatServerURL) {
      this.appVars.globals.chatServerURL =
        this.appVars.globals.APIURL + data.chatServerURL;
    } else {
      this.appVars.globals.chatServerURL = this.appVars.globals.APIURL + "/talk";
    }

    if (data.media_max_bitrate) {
      this.appVars.globals.janusBitRate = data.media_max_bitrate;
    } else {
      this.appVars.globals.janusBitRate = 512000;
    }
    if (data.media_fir_rate) {
      this.appVars.globals.janusFirRate = data.media_fir_rate;
    } else {
      this.appVars.globals.janusFirRate = 5;
    }
    lg(
      "setting media server BitRate to:" +
      this.appVars.globals.janusBitRate +
        ". Fir Rate:" +
        this.appVars.globals.janusFirRate
    );

    if (data.relay_to_repeaters) {
      //split
      this.appVars.globals.janusRepeaters = [];
      try {
        this.appVars.globals.janusRepeaters = data.media_relays.split(",");
      } catch (rrr) {}

      lg(
        "setting media relays to :" +
          JSON.stringify(this.appVars.globals.janusRepeaters)
      );
    }
  }

}