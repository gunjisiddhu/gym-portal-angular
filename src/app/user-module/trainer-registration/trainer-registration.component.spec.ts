import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TrainerRegistrationComponent } from './trainer-registration.component';
import { TrainerService } from '../../service/trainer.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../shared-module/dialog-box/dialog-box.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import {NavbarComponent} from "../../shared-module/navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";

describe('TrainerRegistrationComponent', () => {
  let component: TrainerRegistrationComponent;
  let fixture: ComponentFixture<TrainerRegistrationComponent>;
  let trainerService: TrainerService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerRegistrationComponent, NavbarComponent],
      providers: [
        {provide: TrainerService, useValue: {saveTrainer: () => of({username: 'testUser', password: 'password'})}},
        {
          provide: MatDialog, useValue: {
            open: () => {
            }
          }
        },
      ],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatToolbarModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerRegistrationComponent);
    component = fixture.componentInstance;
    trainerService = TestBed.inject(TrainerService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create the TrainerRegistrationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should submit trainer registration and open a dialog on successful registration', fakeAsync(() => {
    spyOn(trainerService, 'saveTrainer').and.callThrough();
    spyOn(dialog, 'open').and.stub();

    component.trainer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      specializationId: '1',
    };

    component.onSubmit();
    tick();

    expect(trainerService.saveTrainer).toHaveBeenCalledWith(component.trainer);
    expect(dialog.open).toHaveBeenCalledWith(DialogBoxComponent, {
      data: { username: 'testUser', password: 'password' },
    });
  }));

});
