import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomAlertsPage } from './room-alerts.page';

const routes: Routes = [
  {
    path: '',
    component: RoomAlertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomAlertsPageRoutingModule {}
