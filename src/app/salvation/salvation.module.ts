import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalvationPageRoutingModule } from './salvation-routing.module';

import { SalvationPage } from './salvation.page';
import {BrMaskerModule} from "br-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SalvationPageRoutingModule,
        BrMaskerModule,
        ReactiveFormsModule
    ],
  declarations: [SalvationPage]
})
export class SalvationPageModule {}
