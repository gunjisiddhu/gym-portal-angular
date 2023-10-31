import {Component} from '@angular/core';
import {UserService} from "../service/UserService";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  traineeUsername: string = "sreejagaadu42344";


  constructor(private userService: UserService) {

  }

  onClick() {
    //this.userService.getDetails(this.traineeUsername);
  }

}
