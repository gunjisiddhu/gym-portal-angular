export class Credentials {
  username: string;
  password: string;

  constructor(name: string, pass: string) {
    this.username = name;
    this.password = pass;
  }

  toString(): string {
    return "" + this.username + " " + this.password;
  }

}
