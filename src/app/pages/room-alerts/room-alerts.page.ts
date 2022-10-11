import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonVirtualScroll } from '@ionic/angular';
import { SharedService  } from 'src/app/services/shared.service';
import { ChatModelService } from 'src/app/services/chat-model.service';
import { RoomAlertsDetailPage } from 'src/app/pages/room-alerts-detail/room-alerts-detail.page';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-room-alerts',
  templateUrl: './room-alerts.page.html',
  styleUrls: ['./room-alerts.page.scss'],
})
export class RoomAlertsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  alertLogs: any[]=[];
  showSearchbar = false;
  alertMessage:any;
  isPresenter:any;
  msgAlerts:any[]=[];
  
  constructor(private alertController: AlertController, private modalController: ModalController, public shared: SharedService, public chatService: ChatModelService) {

    if(this.alertLogs == null || this.alertLogs == undefined || this.alertLogs.length == 0){
      this.alertLogs = JSON.parse(localStorage.getItem('alertLog'));
      this.scrollToBottomOnInit();
    }
    if(this.alertLogs != null || this.alertLogs != undefined){
      this.shared.getObservable().subscribe((data) => {
        if(data.Name == 'getAlertlogList'){
          localStorage.removeItem("alertLog");
          this.getAlertlogList(data.Value);          
        }
          if(data.Name == 'cmd'){
            this.cmdMsg(data.Value);          
          }    

      });
    }
    this.alertMessage = '';
    this.isPresenter = this.chatService.isPresenter();
  }

  ngOnInit() {
  }

  getAlertlogList = (data:any) => {
    this.alertLogs = [];

    data.forEach(val => {
      var txtMsg = this.urlify(val.text);
      if(val.isImgLink){
        var isImg_Link = val.isImgLink;
        this.alertLogs.push({
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
        this.alertLogs.push({
          email:val.email,
          time:val.time,
          uid:val.uid,
          user:val.user,
          text:txtMsg
        })
      }
    })

    this.scrollToBottomOnInit();
  }

  urlify = (text: any)  => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url: string) {
      return `<a>${url}</a>`;
    })
  }


  cmdMsg = (data) => {
    if (data == 'clearAlertLog') {
          this.alertLogs=this.chatService.alertMsgs;
    }
    if (data == 'clearChatLog') {

    }    
  }

  alertDetails = async(detail) => {
      const modal = await this.modalController.create({
        component: RoomAlertsDetailPage,
        componentProps: {
          data: detail
        }
      });
      return await modal.present();
  }


  scrollToBottomOnInit = () => {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(500);
        }
    }, 1000);
}

  sendAlert = async(altMsg) => {
    if (!altMsg) { return; }
    const alert = await this.alertController.create({
      header: 'Text this out?',
      message: 'Do you also want to Text this alert out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.send_MsgServer(altMsg);
            return false;
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.sendMsgServer(altMsg);
          },
        },
      ],
    });

    await alert.present();
  }

  sendMsgServer = (Msg) => {
    this.chatService.send("alert", {txt: Msg, sendTxt: true });
    this.alertMessage = '';
    this.scrollToBottomOnInit();
  }

  send_MsgServer = (Msg) => {
    this.chatService.send("alert", {txt: Msg, sendTxt: false });
    this.alertMessage = '';
    this.scrollToBottomOnInit();
  }


  doLargerSendAlert = () => {
        this.alertController.create({
          header: 'Type your alert msg here',
      inputs: [
        {
          type: 'textarea',
          name: 'alertMessage',
          placeholder: 'Enter msg',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'cancelbtn',
          handler: data => {
          }
        },
        {
          text: 'Submit',
          cssClass: 'submitbtn',
          handler: data => {
            this.sendAlertMsg(data.alertMessage);
          }
        }
      ]
        }).then(res => {
          res.present();

    });
  }

  sendAlertMsg = (message) => {
    if (!message) { return; }
        console.log(message);
        this.chatService.send("alert", {txt: message, sendTxt: true });
        this.scrollToBottomOnInit();
  }

}