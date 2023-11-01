import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MyaccountTrainerprofileComponent } from './myaccount-trainerprofile.component';
import { TrainerProfile } from '../models/TrainerProfile';
import { TraineeBasicDetails } from '../models/TraineeBasicDetails';
import {
  TrainerTrainingRequestBoxComponent
} from "../trainer-training-request-box/trainer-training-request-box.component";
import {TraineeNavbarComponent} from "../trainee-navbar/trainee-navbar.component";
import {TrainerNavbarComponent} from "../trainer-navbar/trainer-navbar.component";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

describe('MyaccountTrainerprofileComponent', () => {
  let component: MyaccountTrainerprofileComponent;
  let fixture: ComponentFixture<MyaccountTrainerprofileComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockMatDialog: any;

  beforeEach(() => {

    const trainerProfile = new TrainerProfile("johndoe","John","Doe","Fitness");
    trainerProfile.active = true;


    const trainee1 = new TraineeBasicDetails();
    trainee1.username = 'user1';
    trainee1.firstName = 'Alice';
    trainee1.lastName = 'Smith';

    const trainee2 = new TraineeBasicDetails();
    trainee2.username = 'user2';
    trainee2.firstName = 'Bob';
    trainee2.lastName = 'Johnson';

    trainerProfile.traineeList = [trainee1, trainee2];

    /*mockActivatedRoute = {
      snapshot: {
        data: {
          profile: trainerProfile,
        },
      },
    };*/

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockMatDialog = {
      open: jasmine.createSpy('open'),
    };

    TestBed.configureTestingModule({
      declarations: [MyaccountTrainerprofileComponent, MyaccountTrainerprofileComponent, TrainerNavbarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      imports:[
        MatTableModule,
        MatToolbarModule,
        MatIconModule
      ]

    });
    spyOnProperty(window.history, 'state').and.returnValue({
      profile: trainerProfile});

    fixture = TestBed.createComponent(MyaccountTrainerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trainerProfile and dataSource on ngOnInit', () => {
    expect(component.trainerProfile).toBeDefined();
    expect(component.dataSource).toBeDefined();
  });

  it('should navigate to addTraining', () => {
    component.addTraining();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['addTraining'], {
      state: { trainerProfile: component.trainerProfile },
    });
  });

  it('should open the training request dialog', () => {
    component.requestTrainingData();
    expect(mockMatDialog.open).toHaveBeenCalledWith(TrainerTrainingRequestBoxComponent, {
      data: component.trainerProfile,
    });
  });

  it('should navigate to updateTrainerProfile', () => {
    component.editTrainerProfile();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/updateTrainerProfile'], {
      state: { trainerProfile: component.trainerProfile },
    });
  });

  it('should display trainer status', () => {
    const activeStatusElement = fixture.nativeElement.querySelector('.active');
    const inactiveStatusElement = fixture.nativeElement.querySelector('.inactive');
    component.trainerProfile.active = true;
    fixture.detectChanges();
    expect(activeStatusElement).toBeTruthy();
    expect(inactiveStatusElement).toBeFalsy();
  });


  it('should display trainees in the table', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('.mat-row');
    expect(tableRows.length).toBe(0);
  });
});
