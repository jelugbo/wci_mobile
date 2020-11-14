import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestimonyPageRoutingModule } from './testimony-routing.module';

import { TestimonyPage } from './testimony.page';
import {BrMaskerModule} from "br-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TestimonyPageRoutingModule,
        ReactiveFormsModule,
        BrMaskerModule
    ],
  declarations: [TestimonyPage]
})
export class TestimonyPageModule {}
