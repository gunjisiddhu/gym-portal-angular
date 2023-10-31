import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TrainerProfile} from "../models/TrainerProfile";
import {TrainerProfileUpdate} from "../models/TrainerProfileUpdate";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TrainerService} from "../service/trainer.service";

interface Specialization {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-trainer-profile-update',
  templateUrl: './trainer-profile-update.component.html',
  styleUrls: ['./trainer-profile-update.component.css']
})
export class TrainerProfileUpdateComponent {

  trainerForm: FormGroup;
  trainerProfile = new TrainerProfile("", "", "", "");

  specializations: Specialization[] = [
    {value: '1', viewValue: 'Resistance'},
    {value: '2', viewValue: 'Zumba'},
    {value: '3', viewValue: 'Yoga'},
    {value: '4', viewValue: 'Stretching'},
    {value: '5', viewValue: 'Fitness'},
  ];

  constructor(private fb: FormBuilder, private trainerService: TrainerService, private snackBar: MatSnackBar, private router: Router) {
    this.trainerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specializationId: [null, Validators.required],
      active: [false],
    });
  }

  ngOnInit() {
    const state = window.history.state;
    this.trainerProfile = state.trainerProfile;
    console.log(this.trainerProfile);
    this.trainerForm.get('username')?.setValue(this.trainerProfile.username);
    this.trainerForm.get('firstName')?.setValue(this.trainerProfile.firstName);
    this.trainerForm.get('lastName')?.setValue(this.trainerProfile.lastName);
    this.trainerForm.get('email')?.setValue(this.trainerProfile.email);
    this.trainerForm.get('active')?.setValue(this.trainerProfile.active);
    const matchingSpecialization = this.specializations.find(
      (s) => s.viewValue === this.trainerProfile.specialization
    );
    this.trainerForm.get('specializationId')?.setValue(matchingSpecialization?.value);
  }

  onSubmit() {
    if (this.trainerForm.valid) {
      const formValues = this.trainerForm.value;
      console.log(formValues);

      let trainerProfileUpdate = new TrainerProfileUpdate();
      trainerProfileUpdate.username = formValues.username;
      trainerProfileUpdate.firstName = formValues.firstName;
      trainerProfileUpdate.lastName = formValues.lastName;
      trainerProfileUpdate.email = formValues.email;
      trainerProfileUpdate.specializationId = formValues.specializationId;
      trainerProfileUpdate.active = formValues.active;

      this.trainerService.updateTrainerProfile(trainerProfileUpdate).subscribe({
        next: (value: any) => {
          if (value.errorMessage) {
            this.snackBar.open("Error Updating Profile", "Try Again");
          } else {
            this.trainerProfile.firstName = trainerProfileUpdate.firstName;
            this.trainerProfile.lastName = trainerProfileUpdate.lastName;

            const matchingSpecialization = this.specializations.find((s) => s.value === formValues.specializationId);

            this.trainerProfile.specialization = matchingSpecialization?.viewValue;
            this.trainerProfile.active = trainerProfileUpdate.active;
            this.trainerProfile.email = trainerProfileUpdate.email;
            this.router.navigate(['trainerAccount'], {state: {profile: this.trainerProfile}});
          }

        },
        error: (error: any) => {
          console.log(error);
          this.snackBar.open("Error Retrieving Data", "Try Again");
        }
      });


    }
  }

}
