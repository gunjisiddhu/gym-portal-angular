import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyaccountTrainerprofileComponent} from "./myaccount-trainerprofile/myaccount-trainerprofile.component";
import {trainerGuard} from "../route-gaurd/trainer.guard";
import {TrainingComponent} from "./training/training.component";
import {UpdateTraineeProfileComponent} from "../trainee-module/update-trainee-profile/update-trainee-profile.component";
import {traineeGuard} from "../route-gaurd/trainee.guard";
import {TrainerProfileUpdateComponent} from "./trainer-profile-update/trainer-profile-update.component";

const routes: Routes = [
  {
    path: "trainerAccount",
    component: MyaccountTrainerprofileComponent,
    canActivate: [trainerGuard]
  },

  {
    path: "addTraining",
    component: TrainingComponent,
    canActivate: [trainerGuard]
  },

  {
    path: "updateTraineeProfile",
    component: UpdateTraineeProfileComponent,
    canActivate: [traineeGuard]
  },
  {
    path: "updateTrainerProfile",
    component: TrainerProfileUpdateComponent,
    canActivate: [trainerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerModuleRoutingModule { }
