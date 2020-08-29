import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from './habit-builder/panel/panel.component';

const routes: Routes = [
  {
    path : "**",
    component : PanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
