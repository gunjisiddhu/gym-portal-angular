import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginFormComponent} from './user-module/login-form/login-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {TrainerRegistrationComponent} from './user-module/trainer-registration/trainer-registration.component';
import {NavbarComponent} from './shared-module/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MyaccountStudentprofileComponent} from './trainee-module/myaccount-studentprofile/myaccount-studentprofile.component';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {JoinUsComponent} from './user-module/join-us/join-us.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {TraineeRegistrationComponent} from './user-module/trainee-registration/trainee-registration.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterComponent} from './shared-module/footer/footer.component';
import {MatNativeDateModule} from "@angular/material/core";
import {ChangePasswordComponent} from './shared-module/change-password/change-password.component';
import {MyaccountTrainerprofileComponent} from './trainer-module/myaccount-trainerprofile/myaccount-trainerprofile.component';
import {UpdateTraineeProfileComponent} from './trainee-module/update-trainee-profile/update-trainee-profile.component';
import {MatRadioModule} from "@angular/material/radio";
import {HttpClientModule} from "@angular/common/http";
import {DialogBoxComponent} from './shared-module/dialog-box/dialog-box.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EditTrainersListComponent} from './trainee-module/edit-trainers-list/edit-trainers-list.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TrainingComponent} from './trainer-module/training/training.component';
import {
  TraineeTrainingRequestBoxComponent
} from './trainee-module/trainee-training-request-box/trainee-training-request-box.component';
import {
  TrainerTrainingRequestBoxComponent
} from './trainer-module/trainer-training-request-box/trainer-training-request-box.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {TrainingsDisplayComponent} from './shared-module/trainings-display/trainings-display.component';
import {TrainerProfileUpdateComponent} from './trainer-module/trainer-profile-update/trainer-profile-update.component';
import {TraineeNavbarComponent} from './trainee-module/trainee-navbar/trainee-navbar.component';
import {TrainerNavbarComponent} from './trainer-module/trainer-navbar/trainer-navbar.component';
import {HomeComponent} from './user-module/home/home.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    TrainerRegistrationComponent,
    NavbarComponent,
    MyaccountStudentprofileComponent,
    JoinUsComponent,
    TraineeRegistrationComponent,
    FooterComponent,
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
