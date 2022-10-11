import { Component, OnInit, Input } from '@angular/core';
import {  ModalController } from '@ionic/angular';

@Component({
  selector: 'app-room-alerts-detail',
  templateUrl: './room-alerts-detail.page.html',
  styleUrls: ['./room-alerts-detail.page.scss'],
})
export class RoomAlertsDetailPage implements OnInit {
  @Input() data: any;
  alertDetail:any[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
        console.log(this.data);
        this.alertDetail = Array.of(this.data);
  }

  closeModal = async() => {
    await this.modalController.dismiss();
  }

  doAlertCopy = () => {
    //cordova.plugins.clipboard.copy(txt);
  }

}
