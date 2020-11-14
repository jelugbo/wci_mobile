import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrayerPageRoutingModule } from './prayer-routing.module';
import { PrayerPage } from './prayer.page';
import {BrMaskerModule} from "br-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrayerPageRoutingModule,
        ReactiveFormsModule,
        BrMaskerModule
    ],
  declarations: [PrayerPage]
})
export class PrayerPageModule {}
