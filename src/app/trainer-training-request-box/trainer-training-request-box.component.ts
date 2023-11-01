import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {TrainingDetails} from "../models/TrainingDetails";
import {TrainerService} from "../service/trainer.service";
import {TraineeBasicDetails} from "../models/TraineeBasicDetails";
import {TrainerProfile} from "../models/TrainerProfile";
import {TrainerTrainings} from "../models/TrainerTrainings";

@Component({
  selector: 'app-trainer-training-request-box',
  templateUrl: './trainer-training-request-box.component.html',
  styleUrls: ['./trainer-training-request-box.component.css']
})
export class TrainerTrainingRequestBoxComponent {

  trainingForm: FormGroup;
  traineesList: TraineeBasicDetails[] = [];
  trainerProfile: TrainerProfile = new TrainerProfile("", "", "", "");

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private trainerService: TrainerService, private snackBar: MatSnackBar,
              public router: Router) {
    this.trainerProfile = data;

    this.traineesList.push(...this.trainerProfile.traineeList);

    this.trainingForm = this.fb.group({
      trainerName: [{value: '', disabled: true}, Validators.required],
      traineeName: [{value: '', disabled: true}, Validators.required],
      traineeToggle: [false],
      range: new FormGroup({
        start: new FormControl<Date | null>({value: null, disabled: true}),
        end: new FormControl<Date | null>({value: null, disabled: true}),
      }),
      dateToggle: [false]
    });

    this.trainingForm.get('traineeToggle')?.valueChanges.subscribe((value) => {
      if (value) {
        this.trainingForm.get('traineeName')?.enable();
      } else {
        this.trainingForm.get('traineeName')?.disable();
      }
    });

    this.trainingForm.get('dateToggle')?.valueChanges.subscribe((value) => {
      if (value) {
        this.trainingForm.get('range')?.enable();
      } else {
        this.trainingForm.get('range')?.disable();
      }
    });

    this.trainingForm.get('trainerName')?.setValue(this.trainerProfile.username);
  }

  onSubmit() {
    let trainerTrainings: TrainerTrainings = new TrainerTrainings();
    trainerTrainings.username = this.trainerProfile.username;

    if (this.trainingForm.value.traineeToggle) {
      trainerTrainings.traineeName = this.trainingForm.value.traineeName;
    }

    if (this.trainingForm.value.dateToggle) {
      const startDate = this.trainingForm.get('range.start')?.value;
      const endDate = this.trainingForm.get('range.end')?.value;
      trainerTrainings.fromDate = formatDate(startDate, 'yyyy-MM-dd', 'en');
      trainerTrainings.endDate = formatDate(endDate, 'yyyy-MM-dd', 'en');
    }


    this.trainerService.getTrainings(trainerTrainings).subscribe({
      next: (value: any) => {
        if (value.errorMessage) {
          this.snackBar.open("Please Check Inputs and try Again!", "Ok");
        } else {
          let trainingsDetails: TrainingDetails[] = value;
          if (trainingsDetails.length > 0)
            this.router.navigate(['/trainingDisplay'], {state: {trainings: trainingsDetails}});
          else
            this.snackBar.open("No Training Records found", "Ok");
        }
      },
      error: (value: any) => {
        this.snackBar.open("Error Retrieving Trainings", "Ok");
      }
    });

  }

}
