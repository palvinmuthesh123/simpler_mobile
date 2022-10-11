import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertDetailsPageRoutingModule } from './alert-details-routing.module';

import { AlertDetailsPage } from './alert-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertDetailsPageRoutingModule
  ],
  declarations: [AlertDetailsPage]
})
export class AlertDetailsPageModule {}
