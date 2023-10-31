import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyaccountTrainerprofileComponent} from './myaccount-trainerprofile.component';

describe('MyaccountTrainerprofileComponent', () => {
  let component: MyaccountTrainerprofileComponent;
  let fixture: ComponentFixture<MyaccountTrainerprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyaccountTrainerprofileComponent]
    });
    fixture = TestBed.createComponent(MyaccountTrainerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
