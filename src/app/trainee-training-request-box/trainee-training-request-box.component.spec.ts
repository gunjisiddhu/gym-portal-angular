import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TraineeTrainingRequestBoxComponent} from './trainee-training-request-box.component';

describe('TraineeTrainingRequestBoxComponent', () => {
  let component: TraineeTrainingRequestBoxComponent;
  let fixture: ComponentFixture<TraineeTrainingRequestBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeTrainingRequestBoxComponent]
    });
    fixture = TestBed.createComponent(TraineeTrainingRequestBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
