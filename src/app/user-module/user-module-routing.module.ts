import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {JoinUsComponent} from "./join-us/join-us.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {TrainerRegistrationComponent} from "./trainer-registration/trainer-registration.component";
import {TraineeRegistrationComponent} from "./trainee-registration/trainee-registration.component";

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path: "joinUs",
    component: JoinUsComponent
  },
  {
    path: "signIn",
    component: LoginFormComponent
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
    path: "aboutUs",
    component: HomeComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
