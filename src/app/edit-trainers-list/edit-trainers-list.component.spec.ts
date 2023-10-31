import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditTrainersListComponent} from './edit-trainers-list.component';

describe('EditTrainersListComponent', () => {
  let component: EditTrainersListComponent;
  let fixture: ComponentFixture<EditTrainersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTrainersListComponent]
    });
    fixture = TestBed.createComponent(EditTrainersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
