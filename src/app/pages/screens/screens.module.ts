import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreensPageRoutingModule } from './screens-routing.module';

import { ScreensPage } from './screens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreensPageRoutingModule
  ],
  declarations: [ScreensPage]
})
export class ScreensPageModule {}
