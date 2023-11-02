import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {TraineeRegistrationComponent} from './trainee-registration.component';
import {TraineeService} from '../../service/trainee.service';
import {of, throwError} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatButtonHarness} from '@angular/material/button/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {DialogBoxComponent} from "../../shared-module/dialog-box/dialog-box.component";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {Trainee} from "../../models/trainee";
import {NavbarComponent} from "../../shared-module/navbar/navbar.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {Credentials} from "../../models/Credentials";

describe('TraineeRegistrationComponent', () => {
  let component: TraineeRegistrationComponent;
  let fixture: ComponentFixture<TraineeRegistrationComponent>;
  let traineeService: TraineeService;
  let dialog: MatDialog;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraineeRegistrationComponent, NavbarComponent],
      providers: [
        { provide: TraineeService, useValue: { saveTrainee: () => {} } },
      ],
      imports: [MatInputModule, MatFormFieldModule, BrowserAnimationsModule, FormsModule
      , MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeRegistrationComponent);
    component = fixture.componentInstance;
    traineeService = TestBed.inject(TraineeService);
    dialog = TestBed.inject(MatDialog);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the TraineeRegistrationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should submit trainee registration and open a dialog', () => {
    const trainee:Trainee = new Trainee();
    let credential: Credentials = new Credentials("test","pass");
    spyOn(traineeService, 'saveTrainee').and.returnValue(of(credential));
    const openDialogSpy = spyOn(dialog, 'open');

    component.onSubmit();

    expect(openDialogSpy).toHaveBeenCalledWith(DialogBoxComponent, {
      data: { username: credential.username, password: credential.password },
    });
  });

  it('should handle trainee registration error', () => {
    spyOn(traineeService, 'saveTrainee').and.returnValue(throwError('Registration failed'));
    const openDialogSpy = spyOn(dialog, 'open');

    component.onSubmit();

    expect(openDialogSpy).not.toHaveBeenCalled();
  });


  it('should submit form when the "Submit" button is clicked', async () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    const button = await loader.getHarness(MatButtonHarness.with({ text: 'submit' }));

    await button.click();

    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
