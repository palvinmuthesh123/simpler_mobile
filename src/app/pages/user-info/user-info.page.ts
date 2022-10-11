import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ModalController } from '@ionic/angular';
import { ChatModelService } from 'src/app/services/chat-model.service';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  userName: string;
  userEmail: string;
  @Input() data: any;
  userInfo:any[];
  isPresenter:any;
  constructor(private route: ActivatedRoute,
        private router: Router,
        private modalController: ModalController,
        public chatService: ChatModelService,
      //  private theInAppBrowser: InAppBrowser
       ) {
    this.isPresenter = this.chatService.isPresenter();
  }

  ngOnInit() {
    //console.log(this.data);
    this.userInfo = Array.of(this.data);
  }

   closeModal = async() => {
    await this.modalController.dismiss();
  }

  doIPLookUp = (ip) => {
    console.log("doIPLookup ip:"+ip);
    //this.theInAppBrowser.create("https://ip-api.com/#"+encodeURIComponent(ip), '_blank','location=no');
  }

  doMention = (nick) => {
    this.modalController.dismiss();
  }

  kickUser = () => {
    var uid= this.data.uid;
    this.chatService.send("kickUser", {uuid_to_kick: uid});
    this.modalController.dismiss();
  }

  muteUser = () => {
    var uid= this.data.uid;
    this.chatService.send("muteUser", uid);
    this.modalController.dismiss();
  }

  muteScreenUser = () => {
    var uid= this.data.uid;
    this.chatService.send("muteScreenUser", uid);
    this.modalController.dismiss();
  }
  
  restartScreenUser = () => {
    var uid= this.data.uid;
    this.chatService.send("restartScreen", uid);
    this.modalController.dismiss();
  }

  getDebugLog = () => {
    var uid= this.data.uid;
    this.chatService.send("getRLog", uid);
  }

}
