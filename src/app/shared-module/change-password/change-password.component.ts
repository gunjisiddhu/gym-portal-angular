import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModifyPassword} from "../../models/ModifyPassword";
import {UserService} from "../../service/UserService";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: any;


  constructor(private router: Router, private userService: UserService, private _snackBar: MatSnackBar) {
    this.changePasswordForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]),
        confirmPassword: new FormControl('', Validators.required)
      }
    );
  }

  get username() {
    return this.changePasswordForm.get('username');
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  onSubmit() {
    console.log(this.changePasswordForm.value);
    console.log(this.changePasswordForm.value.username);
    console.log(this.changePasswordForm.value.password);

    let modifyPassword: ModifyPassword = new ModifyPassword(this.changePasswordForm.value.username, this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword);


    this.userService.changePassword(modifyPassword).subscribe({
      next: (value: any) => {
        if (value.errorMessage) {
          this._snackBar.open(value.errorMessage, "Close");
        } else {
          this._snackBar.open("Successfully changed password, You can Login again", "Ok");
          this.router.navigate(['/home/signIn']);
        }
      },
      error: (error: any) => {
        this._snackBar.open(error.errorMessage, "Close");
      }
    })
  }

}
