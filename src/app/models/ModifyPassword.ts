export class ModifyPassword {
  username: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;


  constructor(username: string | undefined, oldPassword: string | undefined, newPassword: string | undefined) {
    this.username = username;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
