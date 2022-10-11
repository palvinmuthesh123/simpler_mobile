import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomAlertsDetailPageRoutingModule } from './room-alerts-detail-routing.module';

import { RoomAlertsDetailPage } from './room-alerts-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomAlertsDetailPageRoutingModule
  ],
  declarations: [RoomAlertsDetailPage]
})
export class RoomAlertsDetailPageModule {}
