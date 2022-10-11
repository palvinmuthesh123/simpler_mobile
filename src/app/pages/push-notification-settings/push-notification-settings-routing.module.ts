import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushNotificationSettingsPage } from './push-notification-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PushNotificationSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushNotificationSettingsPageRoutingModule {}
