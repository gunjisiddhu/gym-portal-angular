import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';
import {LoginFormComponent} from './login-form.component';
import {UserService} from '../service/UserService';
import {TraineeProfile} from '../models/TraineeProfile';
import {TrainerProfile} from '../models/TrainerProfile';
import {GuardService} from '../service/GuardService';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from "../navbar/navbar.component";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let userService: UserService;
  let router: Router;
  let guardService: GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent, NavbarComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule
      ],
      providers: [
        {
          provide: UserService,
          useValue: {
            loginTrainee: () => of(new TraineeProfile()), // Mock implementation
            loginTrainer: () => of(new TrainerProfile("testUser","testUser","testUser","testSpecialization")), // Mock implementation
          },
        },
        GuardService,
      ],
    });

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    guardService = TestBed.inject(GuardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default user type to trainee', () => {
    expect(component.selectedUserType).toBe('trainee');
  });

  it('should call loginTrainee when selectedUserType is trainee', fakeAsync(() => {
    const loginTraineeSpy = spyOn(userService, 'loginTrainee').and.returnValue(of(new TraineeProfile()));
    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();
    tick(); // Wait for async operations

    expect(loginTraineeSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  }));

  it('should call loginTrainer when selectedUserType is trainer', fakeAsync(() => {
    component.selectedUserType = 'trainer';
    const loginTrainerSpy = spyOn(userService, 'loginTrainer').and.returnValue(of(new TrainerProfile("testUser","testUser","testUser","testSpecialization")));
    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();
    tick(); // Wait for async operations

    expect(loginTrainerSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  }));

  it('should handle errors when loginTrainee fails', fakeAsync(() => {
    spyOn(userService, 'loginTrainee').and.returnValue(throwError({ errorMessage: 'Login failed' }));
    const snackbarSpy = spyOn(component.snackBar, 'open');

    component.onSubmit();
    tick(); // Wait for async operations

    expect(snackbarSpy).toHaveBeenCalledWith('Login failed', 'Retry');
  }));

  it('should handle errors when loginTrainer fails', fakeAsync(() => {
    component.selectedUserType = 'trainer';
    spyOn(userService, 'loginTrainer').and.returnValue(throwError({ errorMessage: 'Login failed' }));
    const snackbarSpy = spyOn(component.snackBar, 'open');

    component.onSubmit();
    tick(); // Wait for async operations

    expect(snackbarSpy).toHaveBeenCalledWith('Login failed', 'Retry');
  }));

  it('should navigate to myAccount for trainee', () => {
    const traineeProfile = new TraineeProfile();
    const navigateSpy = spyOn(router, 'navigate');
    const setUserRoleSpy = spyOn(guardService, 'setUserRole');

    component.navigateToMyAccount(traineeProfile);

    expect(navigateSpy).toHaveBeenCalled();
    expect(setUserRoleSpy).toHaveBeenCalledWith(2);
  });

  it('should navigate to trainerAccount for trainer', () => {
    const trainerProfile =new TrainerProfile("testUser","testUser","testUser","testSpecialization");
    const navigateSpy = spyOn(router, 'navigate');
    const setUserRoleSpy = spyOn(guardService, 'setUserRole');

    component.navigateToTrainerAccount(trainerProfile);

    expect(navigateSpy).toHaveBeenCalled();
    expect(setUserRoleSpy).toHaveBeenCalledWith(1);
  });
});
