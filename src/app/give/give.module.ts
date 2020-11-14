import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GivePageRoutingModule } from './give-routing.module';

import { GivePage } from './give.page';
import {SharedModule} from "../shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GivePageRoutingModule,
        SharedModule
    ],
  declarations: [GivePage]
})
export class GivePageModule {}
