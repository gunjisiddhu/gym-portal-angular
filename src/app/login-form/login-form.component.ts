import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Credentials} from '../models/Credentials';
import {UserService} from '../service/UserService';
import {TrainerProfile} from "../models/TrainerProfile";
import {TraineeProfile} from "../models/TraineeProfile";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GuardService} from "../service/GuardService";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm: any;
  selectedUserType: string = 'trainee'; // Default to 'trainee'

  constructor(private router: Router, private userService: UserService, public snackBar: MatSnackBar, private guardService: GuardService) {
    localStorage.clear();
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    let credential = new Credentials(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    if (this.selectedUserType === 'trainee') {
      this.userService.loginTrainee(credential).subscribe({
        next: (value: any) => {
          if (value.errorMessage) {
            console.log("Received Error Message" + value.errorMessage);
            this.snackBar.open(value.errorMessage, "Retry");
          } else {
            let traineeProfile: TraineeProfile = value;
            console.log(traineeProfile);
            this.navigateToMyAccount(traineeProfile);
          }
        },
        error: (error: any) => {
          this.snackBar.open(error.errorMessage, "Retry");
        },
      });

    } else if (this.selectedUserType === 'trainer') {
      this.userService.loginTrainer(credential).subscribe({
        next: (value: any) => {
          if (value.errorMessage) {
            this.snackBar.open(value.errorMessage, "Retry");
          } else {
            let trainerProfile: TrainerProfile = value;
            console.log(trainerProfile);
            this.navigateToTrainerAccount(trainerProfile);
          }
        },
        error: (error: any) => {
          this.snackBar.open(error.errorMessage, "Retry");
        },
      });
    }
  }

  navigateToMyAccount(profile: TraineeProfile) {
    this.guardService.setUserRole(2);
    this.router.navigate(['myAccount'], {state: {profile}});
  }

  navigateToTrainerAccount(profile: TrainerProfile) {
    this.guardService.setUserRole(1);
    this.router.navigate(['trainerAccount'], {state: {profile}});
  }
}
