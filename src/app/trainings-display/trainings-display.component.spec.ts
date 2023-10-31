import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainingsDisplayComponent} from './trainings-display.component';

describe('TrainingsDisplayComponent', () => {
  let component: TrainingsDisplayComponent;
  let fixture: ComponentFixture<TrainingsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingsDisplayComponent]
    });
    fixture = TestBed.createComponent(TrainingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
