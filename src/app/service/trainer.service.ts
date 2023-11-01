import {Injectable} from '@angular/core';
import {TrainerRegistration} from "../models/trainer-registration";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainerTrainings} from "../models/TrainerTrainings";
import {TrainerProfileUpdate} from "../models/TrainerProfileUpdate";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private baseUrl = "http://localhost:8120/gym/trainer"


  constructor(private httpclient: HttpClient) {
  }

  saveTrainer(trainer: TrainerRegistration): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/register`, trainer);
  }

  getTrainings(trainerTrainings: TrainerTrainings): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/trainingList`, trainerTrainings);
  }

  updateTrainerProfile(trainerProfileUpdate: TrainerProfileUpdate) {
    return this.httpclient.put<any>(`${this.baseUrl}/`, trainerProfileUpdate);
  }
}
