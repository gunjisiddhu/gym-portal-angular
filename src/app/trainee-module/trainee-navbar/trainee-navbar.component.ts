import {Component, Input} from '@angular/core';
import {
  TraineeTrainingRequestBoxComponent
} from "../trainee-training-request-box/trainee-training-request-box.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-trainee-navbar',
  templateUrl: './trainee-navbar.component.html',
  styleUrls: ['./trainee-navbar.component.css']
})
export class TraineeNavbarComponent {


  @Input() traineeProfile: any;

  constructor( private router: Router, public dialog: MatDialog) {
  }
  traineeTrainings() {
    this.dialog.open(TraineeTrainingRequestBoxComponent, {
      data: this.traineeProfile
    });
  }

  closeSession() {
    console.log(this.traineeProfile.firstName);
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  openHome() {
    this.router.navigate(['/trainee/myAccount'], {state: {profile: this.traineeProfile}});
  }
}
