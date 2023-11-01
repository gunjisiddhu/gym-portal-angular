import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { Router } from '@angular/router';
import { UserService } from '../service/UserService';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {of} from "rxjs";

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let mockRouter: any;
  let mockUserService: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserService = jasmine.createSpyObj('UserService', ['changePassword']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method and navigate on success', () => {
    const mockValue = { errorMessage: null };
    mockUserService.changePassword.and.returnValue(of(mockValue));

    component.changePasswordForm.setValue({
      username: 'testuser',
      oldPassword: 'oldpass123',
      newPassword: 'Newpass123@',
      confirmPassword: 'Newpass123@'
    });

    component.onSubmit();

    expect(mockUserService.changePassword).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['signIn']);
  });

  it('should show error message on failure', () => {
    const mockError = { errorMessage: 'Error occurred!' };
    mockUserService.changePassword.and.returnValue(of(mockError));

    component.changePasswordForm.setValue({
      username: 'testuser',
      oldPassword: 'oldpass123',
      newPassword: 'Newpass123@',
      confirmPassword: 'Newpass123@'
    });

    component.onSubmit();

    expect(mockUserService.changePassword).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error occurred!', 'Close');
  });
});
