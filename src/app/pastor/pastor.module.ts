import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastorPageRoutingModule } from './pastor-routing.module';

import { PastorPage } from './pastor.page';
import {BrMaskerModule} from "br-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PastorPageRoutingModule,
        ReactiveFormsModule,
        BrMaskerModule
    ],
  declarations: [PastorPage]
})
export class PastorPageModule {}
