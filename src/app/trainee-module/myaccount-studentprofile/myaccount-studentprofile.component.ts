import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TraineeProfile} from "../../models/TraineeProfile";
import {MatDialog} from "@angular/material/dialog";
import {
  TraineeTrainingRequestBoxComponent
} from "../trainee-training-request-box/trainee-training-request-box.component";
import {TrainerBasicDetails} from "../../models/TrainerBasicDetails";

export interface TrainerInfo {
  name: string | undefined;
  specialization: string | undefined;
}

const ELEMENT_DATA: TrainerInfo[] = [
  {name: 'sreeja', specialization: 'angular'},
  {name: 'siddu', specialization: 'java'},
  {name: 'lavanya', specialization: 'spring'},
  {name: 'sasi', specialization: 'typescript'},
  {name: 'vamsi', specialization: 'angular'},

];

@Component({
  selector: 'app-myaccount-studentprofile',
  templateUrl: './myaccount-studentprofile.component.html',
  styleUrls: ['./myaccount-studentprofile.component.css']
})
export class MyaccountStudentprofileComponent {
  displayedColumns: string[] = ['name', 'specialization'];
  dataSource: TrainerBasicDetails[] = [];

  traineeProfile: TraineeProfile = new TraineeProfile();

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    const state = window.history.state;
    this.traineeProfile = state.profile;
    this.dataSource.push(...this.traineeProfile.trainersList);
  }


  editTrainers() {
    this.router.navigate(['/trainee/editTrainersList'], {state: {traineeProfile: this.traineeProfile}});
  }

  requestTrainingData() {
    this.dialog.open(TraineeTrainingRequestBoxComponent, {
      data: this.traineeProfile
    });
  }


  editTraineeProfile() {
    this.router.navigate(['/trainee/editTraineeProfile'], {state: {traineeProfile: this.traineeProfile}});
  }
}
