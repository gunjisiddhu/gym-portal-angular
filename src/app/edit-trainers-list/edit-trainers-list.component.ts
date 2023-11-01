import {Component} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {TraineeService} from "../service/trainee.service";
import {TrainerProfile} from "../models/TrainerProfile";
import {TraineeProfile} from "../models/TraineeProfile";
import {TraineeTrainersList} from "../models/TraineeTrainersList";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-edit-trainers-list',
  templateUrl: './edit-trainers-list.component.html',
  styleUrls: ['./edit-trainers-list.component.css']
})

export class EditTrainersListComponent {


  displayedColumns: string[] = ['select', 'username', 'firstName', 'specialization'];
  traineeProfile: TraineeProfile = new TraineeProfile();
  existingTrainerProfiles: TrainerProfile[] = [];


  dataSource = new MatTableDataSource<TrainerProfile>();
  selection = new SelectionModel<TrainerProfile>(true, []);

  loading = true;
  traineeFirstName: any;

  constructor( private router: Router, private traineeService: TraineeService, private _snackBar: MatSnackBar) {
  }


  ngOnInit() {
    const state = window.history.state;

    this.traineeProfile = state.traineeProfile;
    this.traineeFirstName = this.traineeProfile.firstName;
    if (this.traineeProfile.trainersList) {
      for (const trainer of this.traineeProfile.trainersList) {
        this.existingTrainerProfiles.push(new TrainerProfile(trainer.username, trainer.firstName, trainer.secondName, trainer.specialization));
      }
    }


    this.fetchFreeTrainers(this.traineeProfile.username);
    console.log('Received traineeProfile data:', this.traineeProfile);


  }


  fetchFreeTrainers(username: string | undefined) {
    this.traineeService.getFreeTrainers(username).subscribe({
      next: (value: any) => {
        this.dataSource.data.push(...this.existingTrainerProfiles);
        this.selection.select(...this.existingTrainerProfiles);

        this.dataSource.data.push(...value);
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        this._snackBar.open("Error receiving trainer data", "Retry");
      }
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: TrainerProfile): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.username}`;
  }


  saveSelectedItems() {
    const selectedElements = this.selection.selected;

    console.log('Selected Elements:');
    let trainers: string[] = [];
    if (selectedElements.length > 0) {
      for (const element of selectedElements) {
        trainers.push(<string>element.username);
      }
      let traineeTrainerList = new TraineeTrainersList(this.traineeProfile.username, trainers);
      this.traineeService.updateTrainersList(traineeTrainerList).subscribe({
        next: (value: any) => {
          this._snackBar.open("Successfully Updated Trainers, Please Login Again", "OK");
          this.router.navigate(['signIn']);
        },
        error: (error: any) => {
          this._snackBar.open("Error Updating trainers, please try again", "OK");
        }
      });
    } else {
      console.log("Please select at least one element");
      this._snackBar.open("Please select at least one element", "OK");
    }
  }

}

