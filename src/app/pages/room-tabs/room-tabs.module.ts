import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomTabsPageRoutingModule } from './room-tabs-routing.module';

import { RoomTabsPage } from './room-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomTabsPageRoutingModule
  ],
  declarations: [RoomTabsPage]
})
export class RoomTabsPageModule {}
