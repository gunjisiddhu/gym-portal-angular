import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TrainerTrainingRequestBoxComponent } from './trainer-training-request-box.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {TrainerService} from "../../service/trainer.service";
import {Router} from "@angular/router";
import {TrainerProfile} from "../../models/TrainerProfile";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TrainerTrainings} from "../../models/TrainerTrainings";

describe('TrainerTrainingRequestBoxComponent', () => {
  let component: TrainerTrainingRequestBoxComponent;
  let fixture: ComponentFixture<TrainerTrainingRequestBoxComponent>;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let trainerService: any;

  let trainerProfile = new TrainerProfile("testuser","John","Doe","john@example.com" );
  trainerProfile.specialization = '1';
  trainerProfile.email = 'john@example.com';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerTrainingRequestBoxComponent],
      providers: [
        FormBuilder,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {username: 'testUser', traineeList: []},
        },
        {
          provide: MatDialog, useValue: {
            open: () => {
            }
          }
        },
        {
          provide: MatSnackBar, useValue: {
            open: () => {
            }
          }
        },
        {
          provide: Router, useValue: {
            navigate: () => {
            }
          }
        },
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerTrainingRequestBoxComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);

    spyOnProperty(window.history, 'state').and.returnValue({
      trainerProfile: trainerProfile});

    trainerService = TestBed.inject<any>(TrainerService);

    fixture.detectChanges();
  });

  it('should create the TrainerTrainingRequestBoxComponent', () => {
    expect(component).toBeTruthy();
  });



  it('should submit training request', fakeAsync(() => {
    spyOn(trainerService, 'getTrainings').and.returnValue(of([]));
    spyOn(component.router, 'navigate').and.stub();
    spyOn(snackBar, 'open').and.stub();

    component.trainingForm.get('traineeToggle')?.setValue(true);
    component.trainingForm.get('traineeName')?.setValue('testTrainee');
    component.trainingForm.get('dateToggle')?.setValue(true);

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-31');
    component.trainingForm.get('range.start')?.setValue(startDate);
    component.trainingForm.get('range.end')?.setValue(endDate);

    component.onSubmit();
    tick();

    let trainerTrainings:TrainerTrainings = new TrainerTrainings();
    trainerTrainings.username = 'testUser';
    trainerTrainings.traineeName ='testTrainee'
      trainerTrainings.fromDate ='2023-01-01'
        trainerTrainings.endDate = '2023-01-31';

    expect(trainerService.getTrainings).toHaveBeenCalledWith(trainerTrainings);


  }));

  it('should handle error when submitting training request', fakeAsync(() => {
    spyOn(trainerService, 'getTrainings').and.returnValue(throwError('Error'));
    spyOn(component.router, 'navigate').and.stub();
    spyOn(snackBar, 'open').and.stub();

    component.onSubmit();
    tick(); // Wait for the async getTrainings operation

    expect(trainerService.getTrainings).toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Error Retrieving Trainings', 'Ok');
  }));
});
