import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {TrainingsDisplayComponent} from "./trainings-display/trainings-display.component";

const routes: Routes = [
  {
    path: "changePassword",
    component: ChangePasswordComponent
  },
  {
    path: "trainingDisplay",
    component: TrainingsDisplayComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedModuleRoutingModule { }
