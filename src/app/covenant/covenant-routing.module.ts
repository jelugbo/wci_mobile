import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovenantPage } from './covenant.page';

const routes: Routes = [
  {
    path: '',
    component: CovenantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovenantPageRoutingModule {}
