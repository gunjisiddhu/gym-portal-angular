import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "./login-form/login-form.component";
import {JoinUsComponent} from "./join-us/join-us.component";
import {TrainerRegistrationComponent} from "./trainer-registration/trainer-registration.component";
import {TraineeRegistrationComponent} from "./trainee-registration/trainee-registration.component";
import {MyaccountStudentprofileComponent} from "./myaccount-studentprofile/myaccount-studentprofile.component";
import {UpdateTraineeProfileComponent} from "./update-trainee-profile/update-trainee-profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {EditTrainersListComponent} from "./edit-trainers-list/edit-trainers-list.component";
import {MyaccountTrainerprofileComponent} from "./myaccount-trainerprofile/myaccount-trainerprofile.component";
import {TrainingComponent} from "./training/training.component";
import {TrainingsDisplayComponent} from "./trainings-display/trainings-display.component";
import {TrainerProfileUpdateComponent} from "./trainer-profile-update/trainer-profile-update.component";
import {HomeComponent} from "./home/home.component";
import {traineeGuard} from "./shared/trainee.guard";
import {trainerGuard} from "./shared/trainer.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
  }, {
    path: "signIn",
    component: LoginFormComponent
  },
  {
    path: "aboutUs",
    component: HomePageComponent
  },
  {
    path: "joinUs",
    component: JoinUsComponent
  },
  {
    path: "trainerRegistration",
    component: TrainerRegistrationComponent
  },
  {
    path: "traineeRegistration",
    component: TraineeRegistrationComponent,
  },
  {
    path: "myAccount",
    component: MyaccountStudentprofileComponent,
    canActivate: [traineeGuard]
  },
  {
    path: "trainerAccount",
    component: MyaccountTrainerprofileComponent,
    canActivate: [trainerGuard]
  },
  {
    path: "editTraineeProfile",
    component: UpdateTraineeProfileComponent,
    canActivate: [traineeGuard]
  },
  {
    path: "changePassword",
    component: ChangePasswordComponent
  },
  {
    path: "editTrainersList",
    component: EditTrainersListComponent,
    canActivate: [traineeGuard]
  },
  {
    path: "addTraining",
    component: TrainingComponent,
    canActivate: [trainerGuard]
  },
  {
    path: "trainingDisplay",
    component: TrainingsDisplayComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

