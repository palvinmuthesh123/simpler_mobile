import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomAlertsPageRoutingModule } from './room-alerts-routing.module';

import { RoomAlertsPage } from './room-alerts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomAlertsPageRoutingModule
  ],
  declarations: [RoomAlertsPage]
})
export class RoomAlertsPageModule {}
