import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppService } from './app.service';
import { lg } from '../utils/logger';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  public hasPermission: boolean;
  constructor(
    private platform: Platform,
    private appService:AppService,
    private alertController: AlertController,
    //private fcm: FCM,
    private nativeAudio: NativeAudio
  ) {
    this.platform.ready().then(() => {
      lg("Platform ready!")
      //load sounds
      this.nativeAudio.preloadSimple('alert', 'assets/cash.mp3');
    });
    
    (async () => {
      await this.setupFCM();
    })

  }

  //FCM
  private async setupFCM() {
    await this.platform.ready();
    lg('FCM setup started');

    if (!this.platform.is('cordova')) {
      return;
    }

    //TODO: need to get Google Firebase files from ST to install the FCM plugin
    console.error("((((((((((( TODO )))))))))))")
    return;
    // lg('Subscribing to token updates');
    // this.fcm.onTokenRefresh().subscribe((newToken) => {
    //   lg('onTokenRefresh received event with: ', newToken);
    //   this.newFCMToken(newToken);
    // });

    // lg('Subscribing to new notifications');
    // this.fcm.onNotification().subscribe((payload) => {
    //   lg('onNotification received event with: ', payload);
    //   //WAS this.alertLogsDirty=true;
    //   /*
    //  message.data={
    //               'type': 'room',
    //               'title': r.name,
    //               'roomID': ''+r._id,
    //               'senderName': txt.user,
    //               'avatar': "https://secure.gravatar.com/avatar/"+ txt.email+"?d=mm",
    //               'sentDate': ''+Date.now(),
    //               'body': msg
    //           }
    //   */

    //   //TODO: are we logged in?
    //   let alert = payload.data ? payload.data : payload;
     
    //   this.appService.appEventBus.emit('newFCMAlert', alert);
    // });

    // this.hasPermission = await this.fcm.requestPushPermission();
    // lg('requestPushPermission result: ', this.hasPermission);

    // let token = await this.fcm.getToken();
    // lg('getToken result: ', token);
    // this.newFCMToken(token);
  }
  //token FCM stuff

  newFCMToken(newToken: any) {
    lg('appService newFCM token: ' + newToken) + '. device name:';
    this.appService.globals.fcmToken = newToken;
  //  this.appService.localstorage.set('fcmToken', newToken);
  }
}