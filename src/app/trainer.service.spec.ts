import {TestBed} from '@angular/core/testing';

import {TrainerService} from './service/trainer.service';

describe('TrainerService', () => {
  let service: TrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
