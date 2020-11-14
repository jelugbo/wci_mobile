import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WsfPageRoutingModule } from './wsf-routing.module';

import { WsfPage } from './wsf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WsfPageRoutingModule
  ],
  declarations: [WsfPage]
})
export class WsfPageModule {}
