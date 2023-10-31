import {Component, ViewChild} from '@angular/core';
import {TrainingDetails} from "../models/TrainingDetails";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

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
