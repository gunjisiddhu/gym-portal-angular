import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  TrainerTrainingRequestBoxComponent
} from "../trainer-training-request-box/trainer-training-request-box.component";

@Component({
  selector: 'app-trainer-navbar',
  templateUrl: './trainer-navbar.component.html',
  styleUrls: ['./trainer-navbar.component.css']
})
export class TrainerNavbarComponent {

  @Input() trainerProfile: any;

  constructor( private router: Router, public dialog: MatDialog) {
  }

  openHome() {
    this.router.navigate(['/trainer/trainerAccount'], {state: {profile: this.trainerProfile}});
  }

  addTraining() {
    this.router.navigate(['/trainer/addTraining'], {state: {trainerProfile: this.trainerProfile}});
  }

  trainerTrainings() {
    this.dialog.open(TrainerTrainingRequestBoxComponent, {
      data: this.trainerProfile
    });
  }

  closeSession() {
    localStorage.clear();
    this.router.navigate(['/trainer']);
  }
}
