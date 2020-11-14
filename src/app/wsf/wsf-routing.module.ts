import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WsfPage } from './wsf.page';

const routes: Routes = [
  {
    path: '',
    component: WsfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WsfPageRoutingModule {}
