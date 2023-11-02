// import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
// import { TrainerProfileUpdateComponent } from './trainer-profile-update.component';
// import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
// import { TrainerService } from '../service/trainer.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { TrainerProfileUpdate } from '../models/TrainerProfileUpdate';
// import {MatFormFieldModule} from "@angular/material/form-field";
// import {MatIconModule} from "@angular/material/icon";
// import {TrainerProfile} from "../models/TrainerProfile";
// import {MatOptionModule} from "@angular/material/core";
//
// describe('TrainerProfileUpdateComponent', () => {
//   let component: TrainerProfileUpdateComponent;
//   let fixture: ComponentFixture<TrainerProfileUpdateComponent>;
//   let formBuilder: FormBuilder;
//   let trainerService: TrainerService;
//   let snackBar: MatSnackBar;
//   let router: Router;
//
//   let trainerProfile = new TrainerProfile("testuser","John","Doe","john@example.com" );
//   trainerProfile.specialization = '1';
//   trainerProfile.email = 'john@example.com';
//
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TrainerProfileUpdateComponent],
//       imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatOptionModule],
//       providers: [
//         FormBuilder,
//         { provide: TrainerService, useValue: { updateTrainerProfile: () => of({}) } },
//         { provide: MatSnackBar, useValue: { open: () => {} } },
//         { provide: Router, useValue: { navigate: () => {} } }
//       ],
//     });
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TrainerProfileUpdateComponent);
//     component = fixture.componentInstance;
//     formBuilder = TestBed.inject(FormBuilder);
//     trainerService = TestBed.inject(TrainerService);
//     snackBar = TestBed.inject(MatSnackBar);
//     router = TestBed.inject(Router);
//
//     // Mock trainerService.updateTrainerProfile method
//     spyOn(trainerService, 'updateTrainerProfile').and.returnValue(of({}));
//
//     component.trainerForm = formBuilder.group({
//       username: ['testuser', Validators.required],
//       firstName: ['John', Validators.required],
//       lastName: ['Doe', Validators.required],
//       email: ['john@example.com', [Validators.required, Validators.email]],
//       specializationId: [1, Validators.required],
//       active: [true],
//     });
//
//     spyOnProperty(window.history, 'state').and.returnValue({
//       trainerProfile: trainerProfile});
//
//     fixture.detectChanges();
//   });
//
//   it('should create the TrainerProfileUpdateComponent', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should initialize the form with trainer profile data', () => {
//     const state = {
//       trainerProfile: {
//         username: 'testuser',
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john@example.com',
//         specializationId: "1",
//         active: true,
//       },
//     };
//
//     spyOn(window.history, 'state').and.returnValue(state);
//     component.ngOnInit();
//
//     expect(component.trainerForm.value).toEqual(state.trainerProfile);
//   });
//
//   it('should call trainerService.updateTrainerProfile and navigate on form submission', fakeAsync(() => {
//     const navigateSpy = spyOn(router, 'navigate').and.stub();
//     component.onSubmit();
//
//     expect(trainerService.updateTrainerProfile).toHaveBeenCalled();
//     expect(navigateSpy).toHaveBeenCalledWith(['trainerAccount'], { state: { profile: component.trainerProfile } });
//   }));
//
//   it('should show a snackbar message on form submission error', fakeAsync(() => {
//     spyOn(trainerService, 'updateTrainerProfile').and.returnValue(throwError('Error'));
//     const snackBarSpy = spyOn(snackBar, 'open').and.stub();
//
//     component.onSubmit();
//
//     expect(snackBarSpy).toHaveBeenCalledWith('Error Updating Profile', 'Try Again');
//   }));
//
//   it('should disable the submit button when the form is invalid', () => {
//     component.trainerForm.controls['firstName'].setValue('');
//     fixture.detectChanges();
//     const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     expect(submitButton.disabled).toBe(true);
//   });
// });
