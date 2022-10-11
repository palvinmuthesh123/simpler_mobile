import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertDetailsPage } from './alert-details.page';

const routes: Routes = [
  {
    path: '',
    component: AlertDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertDetailsPageRoutingModule {}
