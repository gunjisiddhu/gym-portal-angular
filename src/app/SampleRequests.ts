import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SampleRequests {

  getTraineeDetails: string = "http://localhost:9100/gym/trainee/?username=sreejagaadu42344";
  loginRequest: string = "http://localhost:9100/auth/login";
  private baseUrl = "http://localhost:8120/gym/trainer/register"

  /*
  *
  *
  *
  {
    "username": "sreejagaadu42344",
    "password": "VNeLv@U6j"
  }
  *
  * */
  constructor(private httpclient: HttpClient) {
  }


}
