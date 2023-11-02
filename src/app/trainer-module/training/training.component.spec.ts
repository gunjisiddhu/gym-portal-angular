import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TrainingComponent } from './training.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { of, throwError } from 'rxjs';
import { TrainingService } from '../../service/training.service';
import { DatePipe } from '@angular/common';
import {TrainerProfile} from "../../models/TrainerProfile";
import {HttpClientModule} from "@angular/common/http";
import {TraineeNavbarComponent} from "../../trainee-module/trainee-navbar/trainee-navbar.component";
import {TrainerNavbarComponent} from "../trainer-navbar/trainer-navbar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TrainingDetails} from "../../models/TrainingDetails";

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let snackBar: MatSnackBar;
  let trainingService: any;

  let trainerProfile = new TrainerProfile("testuser","John","Doe","john@example.com" );
  trainerProfile.specialization = '1';
  trainerProfile.email = 'john@example.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingComponent,TrainerNavbarComponent],
      providers: [FormBuilder, MatSnackBar, DatePipe,],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatToolbarModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    trainingService = TestBed.inject<any>(TrainingService);

    spyOnProperty(window.history, 'state').and.returnValue({
      trainerProfile: trainerProfile});


    fixture.detectChanges();
  });

  it('should create the TrainingComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should disable trainerUsername field initially', () => {
    expect(component.trainerUsername.disabled).toBeTruthy();
  });

  it('should set trainerUsername field with the trainer username', () => {
    component.ngOnInit();
    expect(component.trainerUsername.value).toBe('testuser');
  });

  it('should enable/disable training fields when submitting form', () => {
    component.trainingForm.get('traineeUsername').setValue('testTrainee');
    component.trainingForm.get('trainingName').setValue('Test Training');
    component.trainingForm.get('trainingDate').setValue(new Date());
    component.trainingForm.get('trainingDuration').setValue(60);

    expect(component.trainingForm.valid).toBeTruthy();

    component.trainingForm.get('traineeUsername').setValue('');
    expect(component.trainingForm.valid).toBeFalsy();

    component.trainingForm.get('traineeUsername').setValue('testTrainee');
    expect(component.trainingForm.valid).toBeTruthy();
  });

  it('should submit training request', fakeAsync(() => {
    spyOn(trainingService, 'addTraining').and.returnValue(of(null));
    spyOn(snackBar, 'open').and.stub();

    component.trainingForm.get('traineeUsername').setValue('testTrainee');
    component.trainingForm.get('trainingName').setValue('Test Training');
    const currentDate = new Date();
    component.trainingForm.get('trainingDate').setValue(currentDate);
    component.trainingForm.get('trainingDuration').setValue(60);

    component.onSubmit();
    tick();

    let trainingDetails = new TrainingDetails('testuser','testTrainee','Test Training', '2023-11-01',60);

    expect(trainingService.addTraining).toHaveBeenCalledWith(trainingDetails);

    expect(snackBar.open).toHaveBeenCalledWith('Training Added Successfully!', 'Ok');
  }));

  it('should handle error when submitting training request', fakeAsync(() => {
    spyOn(trainingService, 'addTraining').and.returnValue(throwError('Error'));
    spyOn(snackBar, 'open').and.stub();

    component.onSubmit();
    tick();

    expect(trainingService.addTraining).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error Uploading Training, Check and Try Again',
      'Retry'
    );
  }));
});
