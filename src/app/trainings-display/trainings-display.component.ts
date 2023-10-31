import {Component} from '@angular/core';

import {TrainingDetails} from "../models/TrainingDetails";

@Component({
  selector: 'app-trainings-display',
  templateUrl: './trainings-display.component.html',
  styleUrls: ['./trainings-display.component.css']
})
export class TrainingsDisplayComponent {
  trainingData: TrainingDetails[] = [];
  displayedColumns: string[] = ['name', 'date', 'duration', 'trainerName', 'traineeName'];
  traineeProfile: any;

  ngOnInit() {
    const state = window.history.state;
    this.trainingData = state.trainings;
    this.traineeProfile = state.traineeProfile;
  }
}
