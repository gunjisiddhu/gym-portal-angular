import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrainerProfile} from "../models/TrainerProfile";
import {MatDialog} from "@angular/material/dialog";
import {
  TrainerTrainingRequestBoxComponent
} from "../trainer-training-request-box/trainer-training-request-box.component";
import {TraineeBasicDetails} from "../models/TraineeBasicDetails";

@Component({
  selector: 'app-myaccount-trainerprofile',
  templateUrl: './myaccount-trainerprofile.component.html',
  styleUrls: ['./myaccount-trainerprofile.component.css']
})
export class MyaccountTrainerprofileComponent {
  displayedColumns: string[] = ['username', 'firstname', 'lastname'];
  dataSource: TraineeBasicDetails[] = [];
  trainerProfile: TrainerProfile | any;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    const state = window.history.state;
    this.trainerProfile = state.profile;
    this.dataSource = [...this.trainerProfile.traineeList];
  }


  addTraining() {
    this.router.navigate(['addTraining'], {state: {trainerProfile: this.trainerProfile}});
  }

  requestTrainingData() {
    this.dialog.open(TrainerTrainingRequestBoxComponent, {
      data: this.trainerProfile
    });
  }

  editTrainerProfile() {
    this.router.navigate(['/updateTrainerProfile'], {state: {trainerProfile: this.trainerProfile}});
  }
}
