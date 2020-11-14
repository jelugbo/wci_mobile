import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import {SharedModule} from '../shared.module';
import { PopoverPageModule } from '../popover/popover.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NotesPageRoutingModule,
        SharedModule,
        PopoverPageModule
    ],
  declarations: [NotesPage]
})
export class NotesPageModule {}
