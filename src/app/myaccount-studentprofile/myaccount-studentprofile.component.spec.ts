import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyaccountStudentprofileComponent} from './myaccount-studentprofile.component';

describe('MyaccountStudentprofileComponent', () => {
  let component: MyaccountStudentprofileComponent;
  let fixture: ComponentFixture<MyaccountStudentprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyaccountStudentprofileComponent]
    });
    fixture = TestBed.createComponent(MyaccountStudentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
