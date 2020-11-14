import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckinPageRoutingModule } from './checkin-routing.module';

import { CheckinPage } from './checkin.page';
import {BrMaskerModule} from "br-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CheckinPageRoutingModule,
        ReactiveFormsModule,
        BrMaskerModule
    ],
  declarations: [CheckinPage]
})
export class CheckinPageModule {}
