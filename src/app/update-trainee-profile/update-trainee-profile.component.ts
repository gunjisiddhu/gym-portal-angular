import {Component} from '@angular/core';
import {TraineeProfile} from "../models/TraineeProfile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TraineeService} from "../service/trainee.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TraineeProfileUpdate} from "../models/TraineeProfileUpdate";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-trainee-profile',
  templateUrl: './update-trainee-profile.component.html',
  styleUrls: ['./update-trainee-profile.component.css']
})
export class UpdateTraineeProfileComponent {
  traineeProfile: TraineeProfile = new TraineeProfile();
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private traineeService: TraineeService, private snackBar: MatSnackBar, private router: Router) {
    this.userForm = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [null, Validators.required],
      address: [''],
      isActive: [false],
    });
  }

  ngOnInit() {
    const state = window.history.state;
    this.traineeProfile = state.traineeProfile;

    this.userForm.get('username')?.setValue(this.traineeProfile.username);
    this.userForm.get('firstName')?.setValue(this.traineeProfile.firstName);
    this.userForm.get('lastName')?.setValue(this.traineeProfile.lastName);
    this.userForm.get('email')?.setValue(this.traineeProfile.email);
    let date = new Date(parseInt(this.traineeProfile.dateOfBirth[0]), parseInt(this.traineeProfile.dateOfBirth[1]) - 1, parseInt(this.traineeProfile.dateOfBirth[2]));
    this.userForm.get('dateOfBirth')?.setValue(date);
    this.userForm.get('address')?.setValue(this.traineeProfile.address);
    this.userForm.get('isActive')?.setValue(this.traineeProfile.active);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;
      console.log(formValues);

      let val = formValues.dateOfBirth;
      val = formatDate(val, 'yyyy-MM-dd', 'en');

      let traineeProfileUpdate = new TraineeProfileUpdate();
      traineeProfileUpdate.username = this.traineeProfile.username;
      traineeProfileUpdate.firstName = formValues.firstName;
      traineeProfileUpdate.lastName = formValues.lastName;
      traineeProfileUpdate.email = formValues.email;
      traineeProfileUpdate.dateOfBirth = val
      traineeProfileUpdate.address = formValues.address;
      traineeProfileUpdate.active = formValues.isActive;

      this.traineeService.updateTraineeDetails(traineeProfileUpdate).subscribe({
        next: (value: any) => {
          if (value.errorMessage) {
            this.snackBar.open(value.errorMessage, "Try Again");
          } else {
            this.traineeProfile.username = traineeProfileUpdate.username
            this.traineeProfile.firstName = traineeProfileUpdate.firstName
            this.traineeProfile.lastName = traineeProfileUpdate.lastName
            this.traineeProfile.dateOfBirth = val
            this.traineeProfile.address = traineeProfileUpdate.address
            this.traineeProfile.email = traineeProfileUpdate.email
            this.traineeProfile.active = formValues.isActive;
            this.router.navigate(['myAccount'], {state: {profile: this.traineeProfile}});
          }
        },
        error: (error: any) => {
          console.log(error);
          this.snackBar.open("Error Updating Values", "Try Again");
        }
      });

    }
  }
}
