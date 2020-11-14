import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CovenantPageRoutingModule } from './covenant-routing.module';

import { CovenantPage } from './covenant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CovenantPageRoutingModule
  ],
  declarations: [CovenantPage]
})
export class CovenantPageModule {}
