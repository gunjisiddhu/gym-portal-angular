import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {TrainerRegistrationComponent} from './trainer-registration/trainer-registration.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MyaccountStudentprofileComponent} from './myaccount-studentprofile/myaccount-studentprofile.component';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {JoinUsComponent} from './join-us/join-us.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {TraineeRegistrationComponent} from './trainee-registration/trainee-registration.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomePageComponent} from './home-page/home-page.component';
import {FooterComponent} from './footer/footer.component';
import {MatNativeDateModule} from "@angular/material/core";
import {PractiseComponent} from './practise/practise.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MyaccountTrainerprofileComponent} from './myaccount-trainerprofile/myaccount-trainerprofile.component';
import {UpdateTraineeProfileComponent} from './update-trainee-profile/update-trainee-profile.component';
import {MatRadioModule} from "@angular/material/radio";
import {HttpClientModule} from "@angular/common/http";
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EditTrainersListComponent} from './edit-trainers-list/edit-trainers-list.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TrainingComponent} from './training/training.component';
import {
  TraineeTrainingRequestBoxComponent
} from './trainee-training-request-box/trainee-training-request-box.component';
import {
  TrainerTrainingRequestBoxComponent
} from './trainer-training-request-box/trainer-training-request-box.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {TrainingsDisplayComponent} from './trainings-display/trainings-display.component';
import {TrainerProfileUpdateComponent} from './trainer-profile-update/trainer-profile-update.component';
import {TraineeNavbarComponent} from './trainee-navbar/trainee-navbar.component';
import {TrainerNavbarComponent} from './trainer-navbar/trainer-navbar.component';
import {HomeComponent} from './home/home.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    TrainerRegistrationComponent,
    NavbarComponent,
    MyaccountStudentprofileComponent,
    JoinUsComponent,
    TraineeRegistrationComponent,
    HomePageComponent,
    FooterComponent,
    PractiseComponent,
    ChangePasswordComponent,
    MyaccountTrainerprofileComponent,
    UpdateTraineeProfileComponent,
    DialogBoxComponent,
    EditTrainersListComponent,
    TrainingComponent,
    TraineeTrainingRequestBoxComponent,
    TrainerTrainingRequestBoxComponent,
    TrainingsDisplayComponent,
    TrainerProfileUpdateComponent,
    TraineeNavbarComponent,
    TrainerNavbarComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DatePipe,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
