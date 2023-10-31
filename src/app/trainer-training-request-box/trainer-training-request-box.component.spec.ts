import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainerTrainingRequestBoxComponent} from './trainer-training-request-box.component';

describe('TrainerTrainingRequestBoxComponent', () => {
  let component: TrainerTrainingRequestBoxComponent;
  let fixture: ComponentFixture<TrainerTrainingRequestBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerTrainingRequestBoxComponent]
    });
    fixture = TestBed.createComponent(TrainerTrainingRequestBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
