import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomLoginPageRoutingModule } from './room-login-routing.module';

import { RoomLoginPage } from './room-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RoomLoginPageRoutingModule
  ],
  declarations: [RoomLoginPage]
})
export class RoomLoginPageModule {}