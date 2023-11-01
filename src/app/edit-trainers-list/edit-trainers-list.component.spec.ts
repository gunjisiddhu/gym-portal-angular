import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {EditTrainersListComponent} from './edit-trainers-list.component';
import {TraineeService} from '../service/trainee.service';
import {of, throwError} from 'rxjs';
import {TraineeProfile} from '../models/TraineeProfile';
import {TrainerProfile} from '../models/TrainerProfile';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

describe('EditTrainersListComponent', () => {
  let component: EditTrainersListComponent;
  let fixture: ComponentFixture<EditTrainersListComponent>;
  let traineeService: TraineeService;

  let traineeProfile: TraineeProfile = new TraineeProfile();
  traineeProfile.username = 'testUser';

  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTrainersListComponent],

      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],

      providers: [TraineeService,
        { provide: Router, useValue: { navigate: () => {} } },],
    });

    fixture = TestBed.createComponent(EditTrainersListComponent);
    component = fixture.componentInstance;
    traineeService = TestBed.inject(TraineeService);
    router = TestBed.inject(Router);

    spyOnProperty(window.history, 'state').and.returnValue({
      traineeProfile: traineeProfile
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to false on successful data retrieval', () => {
    const mockTraineeProfile = new TraineeProfile();
    mockTraineeProfile.username = 'testUser';
    const routerNavigateSpy = spyOn(router, 'navigate');
    const mockTrainers = [
      new TrainerProfile('user1', 'John', 'Doe', 'Trainer1'),
      new TrainerProfile('user2', 'Alice', 'Smith', 'Trainer2'),
    ];

    const spy = spyOn(traineeService, 'getFreeTrainers').and.returnValue(of(mockTrainers));

    component.ngOnInit();

    expect(component.traineeProfile).toEqual(mockTraineeProfile);
    expect(component.loading).toBe(false);
    expect(spy).toHaveBeenCalledWith('testUser');
  });

  it('should handle errors when fetching trainers', () => {
    spyOn(traineeService, 'getFreeTrainers').and.returnValue(throwError('Some error'));
    const routerNavigateSpy = spyOn(router, 'navigate');
    const snackbarSpy = spyOn(component['_snackBar'], 'open');

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(snackbarSpy).toHaveBeenCalledWith('Error receiving trainer data', 'Retry');
  });

  it('should toggle all rows', () => {
    const routerNavigateSpy = spyOn(router, 'navigate');
    const mockTrainers = [
      new TrainerProfile('user1', 'John', 'Doe', 'Trainer1'),
      new TrainerProfile('user2', 'Alice', 'Smith', 'Trainer2'),
    ];

    component.dataSource.data = mockTrainers;

    component.toggleAllRows();

    expect(component.selection.selected).toEqual(mockTrainers);
    component.toggleAllRows();
    expect(component.selection.isEmpty()).toBe(true);
  });

  it('should handle the checkbox label', () => {
    const routerNavigateSpy = spyOn(router, 'navigate');
    const row = new TrainerProfile('user1', 'John', 'Doe', 'Trainer1');
    const result = component.checkboxLabel(row);

    expect(result).toContain('select');
    component.selection.select(row);
    const result2 = component.checkboxLabel(row);
    expect(result2).toContain('deselect');
  });

  it('should save selected items', () => {
    const routerNavigateSpy = spyOn(router, 'navigate');
    const selectedTrainer = new TrainerProfile('user1', 'John', 'Doe', 'Trainer1');
    component.selection.select(selectedTrainer);
    const updateTrainersListSpy = spyOn(traineeService, 'updateTrainersList').and.returnValue(of([]));
    component.saveSelectedItems();
    expect(updateTrainersListSpy).toHaveBeenCalled();
  });
});
