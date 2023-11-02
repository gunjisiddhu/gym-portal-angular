import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { TraineeNavbarComponent } from './trainee-navbar.component';
import {
  TraineeTrainingRequestBoxComponent
} from "../trainee-training-request-box/trainee-training-request-box.component";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

describe('TraineeNavbarComponent', () => {
  let component: TraineeNavbarComponent;
  let fixture: ComponentFixture<TraineeNavbarComponent>;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeNavbarComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
      ],
      imports:[
        MatToolbarModule,
        MatIconModule,
        MatDialogModule
      ]
    });
    fixture = TestBed.createComponent(TraineeNavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create the TraineeNavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should open TraineeTrainingRequestBoxComponent', () => {
    const openDialogSpy = spyOn(dialog, 'open');
    component.traineeProfile = { firstName: 'John' };
    component.traineeTrainings();
    expect(openDialogSpy).toHaveBeenCalledWith(TraineeTrainingRequestBoxComponent, {
      data: component.traineeProfile,
    });
  });

  it('should clear local storage and navigate to the home page', () => {
    const clearSpy = spyOn(localStorage, 'clear');
    const routerNavigateSpy = spyOn(router, 'navigate');
    component.traineeProfile = { firstName: 'John' };
    component.closeSession();
    expect(clearSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should navigate to the home page', () => {
    const routerNavigateSpy = spyOn(router, 'navigate');
    component.traineeProfile = { firstName: 'John' };
    component.openHome();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['myAccount'], {
      state: { profile: component.traineeProfile },
    });
  });
});
