import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateTraineeProfileComponent} from './update-trainee-profile.component';

describe('UpdateTraineeProfileComponent', () => {
  let component: UpdateTraineeProfileComponent;
  let fixture: ComponentFixture<UpdateTraineeProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTraineeProfileComponent]
    });
    fixture = TestBed.createComponent(UpdateTraineeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
