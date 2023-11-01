import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TraineeTrainingRequestBoxComponent} from './trainee-training-request-box.component';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {TraineeService} from '../service/trainee.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {of, throwError} from 'rxjs';
import {TrainingDetails} from '../models/TrainingDetails';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatNativeDateModule} from "@angular/material/core";

describe('TraineeTrainingRequestBoxComponent', () => {
  let component: TraineeTrainingRequestBoxComponent;
  let fixture: ComponentFixture<TraineeTrainingRequestBoxComponent>;
  let traineeService: TraineeService;
  let snackBar: MatSnackBar;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraineeTrainingRequestBoxComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            trainersList: [
              { username: 'trainer1', firstName: 'John' },
              { username: 'trainer2', firstName: 'Jane' },
            ],
          },
        },
        { provide: TraineeService, useValue: {getTrainings: () => {}} },
        { provide: MatSnackBar, useValue: {open: () => {}} },
      ],
      imports: [
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatDialogModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatNativeDateModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeTrainingRequestBoxComponent);
    component = fixture.componentInstance;
    traineeService = TestBed.inject(TraineeService);
    snackBar = TestBed.inject(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create the TraineeTrainingRequestBoxComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with proper values', () => {
    expect(component.trainingForm).toBeDefined();
  });

  it('should enable/disable form controls based on toggle changes', () => {

    component.trainingForm.get('trainerToggle')?.setValue(true);
    expect(component.trainingForm.get('trainerName')?.enabled).toBe(true);
    expect(component.trainingForm.get('trainingType')?.enabled).toBe(false);

    // Simulate changing dateToggle
    component.trainingForm.get('dateToggle')?.setValue(true);
    expect(component.trainingForm.get('range')?.enabled).toBe(true);

    // Simulate changing trainingToggle
    component.trainingForm.get('trainingToggle')?.setValue(true);
    expect(component.trainingForm.get('trainingType')?.enabled).toBe(true);
    expect(component.trainingForm.get('trainerName')?.enabled).toBe(false);
  });

  it('should handle form submission and API response', fakeAsync(() => {
    const traineeTrainings: TrainingDetails[] = [new TrainingDetails("testUser","testUser","testUser","2023-11-11",12)];
    spyOn(traineeService, 'getTrainings').and.returnValue(of(traineeTrainings));
    spyOn(component.router, 'navigate').and.stub();

    component.onSubmit();
    tick(); // Simulate the passage of time for async operations

    expect(traineeService.getTrainings).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/trainingDisplay'], {
      state: {
        trainings: traineeTrainings,
        traineeProfile: component.traineeProfile,
      },
    });
  }));

  it('should handle form submission and API error', fakeAsync(() => {
    spyOn(traineeService, 'getTrainings').and.returnValue(throwError('API error'));
    spyOn(snackBar, 'open').and.stub();

    component.onSubmit();
    tick();

    expect(traineeService.getTrainings).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Error Retrieving Data', 'Ok');
  }));

});
