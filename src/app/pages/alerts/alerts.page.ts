import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent, IonVirtualScroll } from '@ionic/angular';
import { AppService } from '../../services/app.service';
import jwtDecode from 'jwt-decode';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('alertList') alertList: any;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  alertLogs: any[];
  alertsLoading:boolean;
  alertsLoadedFromRemote:boolean;
  filterByBookmarkAlerts:boolean;
  roomIDs:any[] = [];
  list:any[] = [];
  tradingRooms: any = null;
  validRooms: any = null;
  token : any ;
  decodeToken :any ;
  alertBookmarks:any;
  videoBookmarks:any;
  roomHash:any[]= [];
  room_Name:any;

  constructor(private alertController: AlertController, private modalController: ModalController, private appService: AppService, private router: Router, public loadingController: LoadingController) {
    this.alertsLoading = false;
    this.alertsLoadedFromRemote = false;
    this.filterByBookmarkAlerts = false;
    this.alertBookmarks = {};
    this.videoBookmarks = {};
    this.alertLogs = [];
  }

  ngOnInit() {
    this.getNewToken();
    this.fetchRooms();
  }

  getNewToken = (): void => {
    this.appService.refreshTokenAndList().subscribe((data: any) => {
      //console.log(data);
      if (data.rc == "OK") {
        console.log("refreshTokenSTSSO OK!. rc:" + JSON.stringify(data));
        localStorage.setItem("st_token", data.token);
      }
    });
  
  }

  fetchAlertsMsg = () => {
    this.getNewToken();
    this.fetchRooms();
  }


  fetchAlertsRemote = (roomIDs) => {

    let args : any = {
      "tok":localStorage.getItem("st_token"),
      "cmd":"getAlertsForRooms",
      "sessArr":roomIDs
    }
    console.log("fetchAlertsRemote init..."+JSON.stringify(args));
    this.alertLogs = [];
    this.appService.alertMsgList(args).subscribe((data: any) => { 

      //this.alertLogs = data;
      data.forEach((logEntryArr) => {
        logEntryArr.forEach(element => {
          if(!element){
           // console.log('empty alerts');
          }
          else if(element){
            if(element.logArr.length == 0){
            //  console.log('empty array value');
            }
            else{
             // console.log('Not empty');
              var log_Arr = element.logArr;
              this.roomHash.forEach(val => {
                  if(val.id == element.sessionID){
                   this.room_Name = val.title;
                  }
              })
              log_Arr.forEach(value => {
                 this.alertLogs.push({"email":value.email, "text":value.text, "time":value.time, "user":value.user, "uid":value.uid, "img":value.img, "title":this.room_Name});                
            })

            this.alertLogs.sort((a,b) => {
              return b.time - a.time;
            })
            //console.log("time sort called..."+JSON.stringify(this.alertLogs));
            }
          }
        });

      })
     // this.scrollToBottomOnInit();
    });
  } 

  fetchRooms = async() => {
    
    this.tradingRooms = [];
    this.showLoginLoading();
    await this.appService.fetchRoomList().subscribe((data: any) => {
      this.hideLoginLoading(); 
      this.tradingRooms = data;
      this.token = window.localStorage.getItem('st_token');
      this.decodeToken = jwtDecode(this.token);
      var userMemberships =  this.decodeToken.memberships || [];
      var userProducts = this.decodeToken.products || [];
      var userPermissions = this.decodeToken.permissions || [];
      this.validRooms = this.appService.validfetchRoomList(this.tradingRooms , userMemberships ,userProducts);
      this.tradingRooms = this.validRooms;
      

      this.roomIDs = [];

      this.tradingRooms.forEach(val => {
        if(val.enabled == true){
          this.roomIDs.push(val.id);
          this.roomHash.push({"id":val.id, "title":val.name})
        }
      })
      this.fetchAlertsRemote(this.roomIDs);
     }, (error)=>{     
      this.hideLoginLoading();
      console.log("failed data get: ", error);  

    });

  } 

  scrollToBottomOnInit = () => {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(500);
        }
    }, 1000);
  }

  alertDetails = (alert) => {
    const alertData: NavigationExtras = {
      state: {
        alert,
      },
    };
    this.router.navigate(['/alert-details'], alertData);
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

}