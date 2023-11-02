import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "./user-module/login-form/login-form.component";
import {JoinUsComponent} from "./user-module/join-us/join-us.component";
import {TrainerRegistrationComponent} from "./user-module/trainer-registration/trainer-registration.component";
import {TraineeRegistrationComponent} from "./user-module/trainee-registration/trainee-registration.component";
import {MyaccountStudentprofileComponent} from "./trainee-module/myaccount-studentprofile/myaccount-studentprofile.component";
import {UpdateTraineeProfileComponent} from "./trainee-module/update-trainee-profile/update-trainee-profile.component";
import {ChangePasswordComponent} from "./shared-module/change-password/change-password.component";
import {EditTrainersListComponent} from "./trainee-module/edit-trainers-list/edit-trainers-list.component";
import {MyaccountTrainerprofileComponent} from "./trainer-module/myaccount-trainerprofile/myaccount-trainerprofile.component";
import {TrainingComponent} from "./trainer-module/training/training.component";
import {TrainingsDisplayComponent} from "./shared-module/trainings-display/trainings-display.component";
import {TrainerProfileUpdateComponent} from "./trainer-module/trainer-profile-update/trainer-profile-update.component";
import {HomeComponent} from "./user-module/home/home.component";
import {traineeGuard} from "./route-gaurd/trainee.guard";
import {trainerGuard} from "./route-gaurd/trainer.guard";
import {authGuard} from "./route-gaurd/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("src/app/user-module/user-module.module").then(value => value.UserModuleModule),
  },
  {
    path: "commons",
    loadChildren: () => import("src/app/shared-module/shared-module.module").then(value => value.SharedModuleModule),
    canActivate:[authGuard]
  },
  {
    path: "trainee",
    loadChildren: () => import("src/app/trainee-module/trainee-module.module").then(value => value.TraineeModuleModule),
    canActivate:[traineeGuard]
  },

  {
    path: "trainer",
    loadChildren: () => import("src/app/trainer-module/trainer-module.module").then(value => value.TrainerModuleModule),
    canActivate:[trainerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

