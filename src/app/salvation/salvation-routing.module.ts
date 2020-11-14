import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalvationPage } from './salvation.page';

const routes: Routes = [
  {
    path: '',
    component: SalvationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalvationPageRoutingModule {}
