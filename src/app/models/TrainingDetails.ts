export class TrainingDetails {
  name: string | undefined;
  date: string | undefined;
  duration: number | undefined;
  trainerName: string | undefined;
  traineeName: string | undefined;


  constructor(trainerName: string | undefined, traineeName: string | undefined, name: string | undefined, date: string | undefined, duration: number | undefined) {
    this.name = name;
    this.date = date;
    this.duration = duration;
    this.trainerName = trainerName;
    this.traineeName = traineeName;
  }
}
