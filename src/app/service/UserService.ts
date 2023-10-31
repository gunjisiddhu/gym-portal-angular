import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../models/Credentials";
import {BaseUrlService} from "./BaseUrlService";
import {TraineeProfile} from "../models/TraineeProfile";
import {Observable, of} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {TrainerProfile} from "../models/TrainerProfile";
import {ModifyPassword} from "../models/ModifyPassword";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl;

  constructor(private baseUrlService: BaseUrlService, private httpclient: HttpClient, private snackBar: MatSnackBar) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }

  loginTrainee(credential: Credentials): Observable<any> {
    return this.login(credential).pipe(
      switchMap((isLoginSuccessful) => {
        if (isLoginSuccessful == true) {
          return this.httpclient.get<TraineeProfile>(`${this.baseUrl}/gym/trainee/?username=${credential.username}`);
        } else {
          this.snackBar.open("User not found", "Retry");
          return of({
            errorMessage: "User Doesn't Exist!"
          });
        }
      }),
      catchError(error => {
        return of({
          errorMessage: "User Doesn't Exist!"
        });
      })
    );
  }

  loginTrainer(credential: Credentials): Observable<any> {
    return this.login(credential).pipe(
      switchMap((isLoginSuccessful) => {
        if (isLoginSuccessful == true) {
          return this.httpclient.get<TrainerProfile>(`${this.baseUrl}/gym/trainer/?username=${credential.username}`);
        } else {
          return of({
            errorMessage: "User Doesn't Exist!"
          });
        }
      }),
      catchError(error => {
        return of({
          errorMessage: "User Doesn't Exist!"
        });
      })
    );
  }

  changePassword(modifyPassword: ModifyPassword): Observable<any> {
    console.log("Sending Data for changing password " + modifyPassword);
    return this.httpclient.put(`${this.baseUrl}/gym/user/modifyPassword`, modifyPassword);
  }

  private login(credential: Credentials): Observable<any> {
    console.log("Sending Data " + credential.toString());
    return this.httpclient.post(`${this.baseUrl}/gym/user/login`, credential);
  }
}


/*
*
*
*
* getDetails(traineeUsername: string){
    console.log("Sending Data "+traineeUsername);
    this.httpclient.get<TraineeProfile>(`${this.baseUrl}/gym/trainee/?username=${traineeUsername}`, { responseType: 'json' }).subscribe(response => {
      console.log('Received TraineeProfile:', response);
    });
  }
  *
  *
  *
  *
  private login(credential: Credentials){
    console.log("Sending Data "+credential.toString());
    this.httpclient.post(`${this.baseUrl}/auth/login`, credential, {responseType: 'text' }).subscribe(value => {
      console.log(value.toString());
      localStorage.setItem('token', value.toString());
    });
  }
*
*
* */
