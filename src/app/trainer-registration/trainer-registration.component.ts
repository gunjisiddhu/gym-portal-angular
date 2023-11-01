import {Component} from '@angular/core';
import {TrainerRegistration} from "../models/trainer-registration";
import {TrainerService} from "../service/trainer.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";


interface Specialization {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-trainer-registration',
  templateUrl: './trainer-registration.component.html',
  styleUrls: ['./trainer-registration.component.css']
})

export class TrainerRegistrationComponent {
  specializations: Specialization[] = [
    {value: '1', viewValue: 'Resistance'},
    {value: '2', viewValue: 'Zumba'},
    {value: '3', viewValue: 'Yoga'},
    {value: '4', viewValue: 'Stretching'},
    {value: '5', viewValue: 'Fitness'},
  ];
  trainer: TrainerRegistration = new TrainerRegistration();

  constructor(private trainerService: TrainerService, public dialog: MatDialog) {
  }

  onSubmit() {
    this.trainerService.saveTrainer(this.trainer).subscribe(data => {
      this.dialog.open(DialogBoxComponent, {
        data: {username: data.username, password: data.password}
      });
    });
  }
}
