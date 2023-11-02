import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyaccountStudentprofileComponent} from "./myaccount-studentprofile/myaccount-studentprofile.component";
import {traineeGuard} from "../route-gaurd/trainee.guard";
import {UpdateTraineeProfileComponent} from "./update-trainee-profile/update-trainee-profile.component";
import {EditTrainersListComponent} from "./edit-trainers-list/edit-trainers-list.component";

const routes: Routes = [
  {
    path: "myAccount",
    component: MyaccountStudentprofileComponent,
    canActivate: [traineeGuard]
  },
  {
    path: "editTraineeProfile",
    component: UpdateTraineeProfileComponent,
    canActivate: [traineeGuard]
  },

  {
    path: "editTrainersList",
    component: EditTrainersListComponent,
    canActivate: [traineeGuard]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeModuleRoutingModule { }
