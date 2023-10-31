import {TraineeBasicDetails} from "./TraineeBasicDetails";

export class TrainerProfile {
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  specialization: string | undefined;
  active: boolean | undefined;
  email: string | undefined;
  traineeList: TraineeBasicDetails[] | any;

  constructor(username: string | undefined, firstName: string | undefined, secondName: string | undefined, specialization: string | undefined) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = secondName;
    this.specialization = specialization;
    this.active = true;
    this.email = "";
    this.traineeList = [];
  }

  toString(): string {
    return "" + this.username + " " + this.firstName + " " + this.lastName + " " + this.specialization + " " + this.active + "  " + this.email + "  " + this.traineeList;
  }
}
