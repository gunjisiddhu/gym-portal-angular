import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trainee} from "../models/trainee";
import {TrainerProfile} from "../models/TrainerProfile";
import {BaseUrlService} from "./BaseUrlService";
import {TraineeTrainersList} from "../models/TraineeTrainersList";
import {TraineeTrainings} from "../models/TraineeTrainings";
import {TraineeProfileUpdate} from "../models/TraineeProfileUpdate";

@Injectable({
  providedIn: 'root'
})
export class TraineeService {


  private saveTraineeUrl = "http://localhost:8120/gym/trainee/register";
  private baseUrl;

  constructor(private baseUrlService: BaseUrlService, private httpclient: HttpClient) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }

  saveTrainee(trainee: Trainee): Observable<any> {
    return this.httpclient.post(`${this.saveTraineeUrl}`, trainee);
  }

  getFreeTrainers(username: string | undefined): Observable<TrainerProfile[]> {
    return this.httpclient.get<TrainerProfile[]>(`${this.baseUrl}/gym/trainee/freeTrainers?username=${username}`);
  }

  updateTrainersList(traineeTrainersList: TraineeTrainersList) {
    return this.httpclient.put<TrainerProfile[]>(`${this.baseUrl}/gym/trainee/updateTrainers`, traineeTrainersList);
  }


  getTrainings(traineeTrainings: TraineeTrainings) {
    return this.httpclient.post<any>(`${this.baseUrl}/gym/trainee/trainings`, traineeTrainings);
  }

  updateTraineeDetails(traineeProfileUpdate: TraineeProfileUpdate) {
    return this.httpclient.put<any>(`${this.baseUrl}/gym/trainee/`, traineeProfileUpdate);
  }
}
