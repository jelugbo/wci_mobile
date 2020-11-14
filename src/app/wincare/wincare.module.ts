import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WincarePageRoutingModule } from './wincare-routing.module';

import { WincarePage } from './wincare.page';
import {BrMaskerModule} from "br-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WincarePageRoutingModule,
        ReactiveFormsModule,
        BrMaskerModule
    ],
  declarations: [WincarePage]
})
export class WincarePageModule {}
