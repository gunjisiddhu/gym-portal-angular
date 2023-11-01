import {Component} from '@angular/core';
import {Trainee} from "../models/trainee";
import {TraineeService} from "../service/trainee.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";


@Component({
  selector: 'app-trainee-registration',
  templateUrl: './trainee-registration.component.html',
  styleUrls: ['./trainee-registration.component.css']
})
export class TraineeRegistrationComponent {


  trainee: Trainee = new Trainee();

  constructor(private traineeService: TraineeService, public dialog: MatDialog) {
  }

  onSubmit() {
    this.traineeService.saveTrainee(this.trainee).subscribe({
      next: (value: any) => {
        this.dialog.open(DialogBoxComponent, {
          data: {username: value.username, password: value.password}
        });
      },
      error: (error: any) => {

      }
    });
  }
}
