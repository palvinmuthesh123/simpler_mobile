import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { SharedService  } from 'src/app/services/shared.service';
import { ChatModelService } from 'src/app/services/chat-model.service';
@Component({
  selector: 'app-room-tabs',
  templateUrl: './room-tabs.page.html',
  styleUrls: ['./room-tabs.page.scss'],
})
export class RoomTabsPage implements OnInit {
  isPresenter:boolean=false;

  alertLog:any;
  unreadAlerts:number=0;
  alertMessage:any[]=[];
  rosterCount:number;
  presenterCount:number;
  roster:any;
  presenter:any;

  pages = [
    {
      title: 'Room',
      url: '/room-tabs/screens',
    },
    {
      title: 'Settings',
      url: '/settings',
    },
  ];
  selectedPath = '';
  constructor(public shared: SharedService, 
    private router: Router,
    private alertController: AlertController,
    public appService: AppService,
    private menuCtrl:MenuController,
    public chatService: ChatModelService) {
      this.rosterCount = 0;
      this.presenterCount = 0;

        this.shared.getObservable().subscribe((data) => {
          if(data.Name == 'getAlertlogList'){
            this.getAlertlogList(data.Value);          
          }
          if(data.Name == 'alertMsg'){
            this.alertMsg(data.Value);          
          }    
          if(data.Name == 'getRosterList'){
            this.getRosterList(data.Value);          
          }
          if(data.Name == 'getPresenter'){
            this.getPresenter(data.Value);          
          }          
        });    
  }

  ngOnInit() {

  }
  
  getAlertlogList = (data) => {
    this.alertMessage = [];

    data.forEach(val => {
      var txtMsg = this.urlify(val.text);
      if(val.isImgLink){
        var isImg_Link = val.isImgLink;
          this.alertMessage.push({
            email:val.email,
            time:val.time,
            uid:val.uid,
            user:val.user,
            isImgLink:isImg_Link,
            imgURL:val.imgURL,
            text:txtMsg
          })
      }
      if(!val.isImgLink){
        this.alertMessage.push({
          email:val.email,
          time:val.time,
          uid:val.uid,
          user:val.user,
          text:txtMsg
        })
      }
    })    
    localStorage.setItem("alertLog", JSON.stringify(this.alertMessage));
  }

  alertList = () => {
    this.shared.sendDataPost( {Name:"getAlertlogList", Value:this.alertMessage});      
  }

  alertMsg = (data) => {
    if(this.router.url != '/room-tabs/room-alerts'){
      setTimeout(() => {
        this.unreadAlerts++;      
      });
    }    
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Log Out',
      message: 'Are you sure you want to log out to leave room?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.menuCtrl.close();
            this.leaveSession();
            this.router.navigate(['/home-tabs/rooms']);
          },
        },
      ],
    });

    await alert.present();
  }
 
  urlify = (text: any)  => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url: string) {
      return `<a>${url}</a>`;
    })
  }

  getRosterList = (data) =>{
    if(data == undefined || data == null || data == ''){
      this.rosterCount = 0;
    }
    else{
      this.rosterCount = parseInt(data.length);
      this.roster = data;
      localStorage.setItem("rosterArr", JSON.stringify(data));
    }    
    //console.log(this.rosterCount);
  }

  getPresenter = (val) =>{
    if(val == undefined || val == null || val == ''){
      this.presenterCount = 0;
    }
    else{
      this.presenterCount = parseInt(val.length);
      this.presenter = val;
      localStorage.setItem("presenterArr", JSON.stringify(val));
    }    
  }

  userlist = () => {
    this.shared.sendDataPost( {Name:"getPresenter", Value:this.presenter});                                                  
    this.shared.sendDataPost( {Name:"getRosterList", Value:this.roster}); 
  }

  leaveSession = () => {    
    this.chatService.close();
  } 

}