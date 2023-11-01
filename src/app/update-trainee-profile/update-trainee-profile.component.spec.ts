import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { UpdateTraineeProfileComponent } from './update-trainee-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TraineeService } from '../service/trainee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import {Trainee} from "../models/trainee";
import {TraineeProfile} from "../models/TraineeProfile";
import {TraineeProfileUpdate} from "../models/TraineeProfileUpdate";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";

describe('UpdateTraineeProfileComponent', () => {
  let component: UpdateTraineeProfileComponent;
  let fixture: ComponentFixture<UpdateTraineeProfileComponent>;
  let traineeService: TraineeService;
  let snackBar: MatSnackBar;
  let router: Router;

  let traineeProfile:TraineeProfile = new TraineeProfile();
  traineeProfile.username = "testUser";
  traineeProfile.address = "testing";
  traineeProfile.dateOfBirth = "2023-11-11";
  traineeProfile.active = true;
  traineeProfile.email = "test@mail.com"
  traineeProfile.trainersList = [];
  traineeProfile.lastName = "test";
  traineeProfile.firstName = "user";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTraineeProfileComponent],
      imports: [
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatNativeDateModule
      ],
      providers: [TraineeService, MatSnackBar, Router],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTraineeProfileComponent);
    component = fixture.componentInstance;
    traineeService = TestBed.inject(TraineeService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);

    spyOnProperty(window.history, 'state').and.returnValue({
      traineeProfile: traineeProfile});

    fixture.detectChanges();
  });

  it('should create the UpdateTraineeProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userForm and traineeProfile based on input state', () => {

    expect(component.userForm.get('username')?.value).toBe(traineeProfile.username);
    expect(component.userForm.get('firstName')?.value).toBe(traineeProfile.firstName);
    expect(component.userForm.get('lastName')?.value).toBe(traineeProfile.lastName);
  });

  it('should update the trainee profile on form submission', fakeAsync(() => {
    spyOn(traineeService, 'updateTraineeDetails').and.returnValue(of({}));

    spyOn(router, 'navigate');

    component.onSubmit();
    tick();

    let traineeProfileUpdate: TraineeProfileUpdate = new TraineeProfileUpdate();
    traineeProfileUpdate.username = 'testUser';
    traineeProfileUpdate.firstName = 'user';
    traineeProfileUpdate.lastName = 'test';
    traineeProfileUpdate.email = 'test@mail.com';
    traineeProfileUpdate.dateOfBirth = '1901-12-02';
    traineeProfileUpdate.address = 'testing';
    traineeProfileUpdate.active = true;

    expect(traineeService.updateTraineeDetails).toHaveBeenCalledWith(traineeProfileUpdate);

    expect(router.navigate).toHaveBeenCalledWith(['myAccount'], {
      state: { profile: traineeProfile },
    });
  }));

  it('should handle submission error and display a snackbar message', fakeAsync(() => {
    /*component.userForm.setValue({
      // Provide form values for submission
    });*/

    spyOn(traineeService, 'updateTraineeDetails').and.returnValue(
      throwError({ errorMessage: 'Error Updating Values' })
    );

    spyOn(snackBar, 'open');

    component.onSubmit();
    tick();

    expect(traineeService.updateTraineeDetails).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Error Updating Values', 'Try Again');
  }));

  // Add more test cases to cover form validation and any other component logic.
});
