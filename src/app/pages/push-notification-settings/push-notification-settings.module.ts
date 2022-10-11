import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushNotificationSettingsPageRoutingModule } from './push-notification-settings-routing.module';

import { PushNotificationSettingsPage } from './push-notification-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushNotificationSettingsPageRoutingModule
  ],
  declarations: [PushNotificationSettingsPage]
})
export class PushNotificationSettingsPageModule {}
