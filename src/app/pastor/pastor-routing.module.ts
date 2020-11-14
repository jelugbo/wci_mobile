import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastorPage } from './pastor.page';

const routes: Routes = [
  {
    path: '',
    component: PastorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastorPageRoutingModule {}
