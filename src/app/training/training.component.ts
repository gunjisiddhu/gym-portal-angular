import {Component} from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TrainerProfile} from "../models/TrainerProfile";
import {TrainingDetails} from "../models/TrainingDetails";
import {DatePipe, formatDate} from "@angular/common";
import {TrainingService} from "../service/training.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {

  trainerProfile: TrainerProfile = new TrainerProfile("", "", "", "");
  trainingForm: any;

  constructor(private trainingService: TrainingService, private snackBar: MatSnackBar) {
    this.trainingForm = new FormGroup({
      trainerUsername: new FormControl({value: '', disabled: true}, Validators.required),
      traineeUsername: new FormControl('', Validators.required),
      trainingName: new FormControl('', Validators.required),
      trainingDate: new FormControl('', Validators.required),
      trainingDuration: new FormControl('', Validators.required)

    });
  }

  get trainerUsername() {
    return this.trainingForm.get('trainerUsername');
  }

  get traineeUsername() {
    return this.trainingForm.get('traineeUsername');
  }

  get trainingName() {
    return this.trainingForm.get('trainingName');
  }

  get trainingDate() {
    return this.trainingForm.get('trainingDate');
  }

  get trainingDuration() {
    return this.trainingForm.get('trainingDuration');
  }

  ngOnInit() {
    const state = window.history.state;
    this.trainerProfile = state.trainerProfile;
    this.trainingForm.get('trainerUsername').setValue(this.trainerProfile.username);
  }

  onSubmit() {
    let training = new TrainingDetails(
      this.trainerProfile.username,
      this.trainingForm.value.traineeUsername,
      this.trainingForm.value.trainingName,
      this.trainingForm.value.trainingDate,
      this.trainingForm.value.trainingDuration
    );

    training.date = formatDate(this.trainingForm.value.trainingDate, 'yyyy-MM-dd', 'en');

    this.trainingService.addTraining(training).subscribe({
      next: (value: any) => {
        console.log("Added Data Successfully");
        if (value) {
          this.snackBar.open("Error Uploading Training, Check and Try Again", "Retry");
        } else {
          this.snackBar.open("Training Added Successfully!", "Ok");
        }
      },
      error: (error: any) => {
        console.log(error);
        this.snackBar.open("Error Uploading Training, Check and Try Again", "Retry");
      }
    })
  }

  formatDate(date: Date) {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
  }


}
