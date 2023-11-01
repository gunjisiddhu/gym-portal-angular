import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MyaccountStudentprofileComponent } from './myaccount-studentprofile.component';
import { TraineeProfile } from '../models/TraineeProfile';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TraineeTrainingRequestBoxComponent } from '../trainee-training-request-box/trainee-training-request-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import {Router} from "@angular/router";
import {TraineeNavbarComponent} from "../trainee-navbar/trainee-navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {of} from "rxjs";

describe('MyaccountStudentprofileComponent', () => {
  let component: MyaccountStudentprofileComponent;
  let fixture: ComponentFixture<MyaccountStudentprofileComponent>;
  let dialog: MatDialog;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MyaccountStudentprofileComponent, TraineeNavbarComponent],
        imports: [
          MatButtonModule,
          MatTableModule,
          RouterTestingModule,
          MatIconModule,
          MatRadioModule,
          MatDialogModule,
          MatToolbarModule
        ],
        providers: [MatDialog],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountStudentprofileComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);

    // Set up a mock trainee profile
    const traineeProfile: TraineeProfile = new TraineeProfile();
    traineeProfile.firstName = 'John';
    traineeProfile.lastName = 'Doe';
    traineeProfile.email = 'john.doe@example.com';
    traineeProfile.dateOfBirth = "2023-11-11";
    traineeProfile.address = '123 Main St';
    traineeProfile.active = true;

    // Set the trainee profile in the component
    component.traineeProfile = traineeProfile;


    spyOnProperty(window.history, 'state').and.returnValue({
      profile: traineeProfile});


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to editTrainers', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.editTrainers();
    expect(navigateSpy).toHaveBeenCalledWith(['/editTrainersList'], {
      state: { traineeProfile: component.traineeProfile },
    });
  });

  it('should navigate to editTraineeProfile', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.editTraineeProfile();
    expect(navigateSpy).toHaveBeenCalledWith(['/updateTraineeProfile'], {
      state: { traineeProfile: component.traineeProfile },
    });
  });

  // Add more test cases for additional coverage
});
