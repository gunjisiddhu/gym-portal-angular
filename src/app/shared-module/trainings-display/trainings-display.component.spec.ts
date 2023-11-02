import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingsDisplayComponent } from './trainings-display.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TrainingDetails} from "../../models/TrainingDetails";
import {TraineeProfile} from "../../models/TraineeProfile";

describe('TrainingsDisplayComponent', () => {
  let component: TrainingsDisplayComponent;
  let fixture: ComponentFixture<TrainingsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingsDisplayComponent],
      imports: [MatTableModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsDisplayComponent);
    component = fixture.componentInstance;



  });

  it('should create the TrainingsDisplayComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trainingData, displayedColumns, and traineeProfile based on input state', () => {
    const trainings:TrainingDetails[] = [
     new TrainingDetails("testuser","testTrainee","testUser","2023-11-11",60)
    ];

    const traineeProfile = new TraineeProfile();

    const state = {
      trainings,
      traineeProfile,
    };

    window.history.pushState(state, '');

    fixture.detectChanges();

    expect(component.trainingData).toEqual([Object({ name: 'testUser', date: '2023-11-11', duration: 60, trainerName: 'testuser', traineeName: 'testTrainee' })]);
    expect(component.displayedColumns).toEqual(['name', 'date', 'duration', 'trainerName', 'traineeName']);
    expect(component.traineeProfile).toEqual(Object({ dateOfBirth: '', trainersList: [  ] }));
  });

  it('should render training data in the table', () => {
    const trainings = [
      {
        trainerName: 'John Doe',
        traineeName: 'Alice',
        name: 'Fitness Training',
        date: new Date('2023-10-25'),
        duration: 60,
      },
    ];

    const state = {
      trainings,
      traineeProfile: {
      },
    };

    window.history.pushState(state, '');

    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('table tr');
  });

});
