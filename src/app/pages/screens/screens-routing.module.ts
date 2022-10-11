import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreensPage } from './screens.page';

const routes: Routes = [
  {
    path: '',
    component: ScreensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreensPageRoutingModule {}
