export class TraineeTrainersList {
  private traineeUsername: string | undefined;
  private trainerUsernameList: string[] | undefined;

  constructor(username: string | undefined, trainers: string[]) {
    this.traineeUsername = username;
    this.trainerUsernameList = trainers;
  }
}
