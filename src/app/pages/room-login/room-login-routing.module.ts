import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomLoginPage } from './room-login.page';

const routes: Routes = [
  {
    path: '',
    component: RoomLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomLoginPageRoutingModule {}
