import {TrainerBasicDetails} from "./TrainerBasicDetails";

export class TraineeProfile {
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string = "";
  address: string | undefined;
  email: string | undefined;
  active: boolean | undefined;
  trainersList: TrainerBasicDetails[] = [];
}

