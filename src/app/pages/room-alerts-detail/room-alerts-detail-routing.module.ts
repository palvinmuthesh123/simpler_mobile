import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomAlertsDetailPage } from './room-alerts-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RoomAlertsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomAlertsDetailPageRoutingModule {}
