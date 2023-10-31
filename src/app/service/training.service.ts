import {Injectable} from "@angular/core";
import {BaseUrlService} from "./BaseUrlService";
import {HttpClient} from "@angular/common/http";
import {TrainingDetails} from "../models/TrainingDetails";

@Injectable({
  providedIn: 'root'
})


export class TrainingService {
  private baseUrl;

  constructor(private baseUrlService: BaseUrlService, private httpclient: HttpClient) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }


  addTraining(training: TrainingDetails) {
    return this.httpclient.post<any>(`${this.baseUrl}/gym/training`, training);
  }
}
