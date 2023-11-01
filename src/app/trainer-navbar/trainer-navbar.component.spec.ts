import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TrainerNavbarComponent} from './trainer-navbar.component';
import {MatDialog} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {
  TrainerTrainingRequestBoxComponent
} from '../trainer-training-request-box/trainer-training-request-box.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

describe('TrainerNavbarComponent', () => {
  let component: TrainerNavbarComponent;
  let fixture: ComponentFixture<TrainerNavbarComponent>;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerNavbarComponent],
      providers: [{
          provide: MatDialog, useValue: {
            open: () => {
            }
          }
        },
      ],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerNavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create the TrainerNavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to trainer account on home button click', () => {
    spyOn(router, 'navigate').and.stub();
    component.openHome();
    expect(router.navigate).toHaveBeenCalledWith(['trainerAccount'], Object({state: Object({profile: undefined})}));
  });

  it('should navigate to addTraining on addTraining button click', () => {
    spyOn(router, 'navigate').and.stub();
    component.addTraining();
    expect(router.navigate).toHaveBeenCalledWith(['addTraining'], Object({state: Object({trainerProfile: undefined})}));
  });

  it('should open TrainerTrainingRequestBoxComponent dialog on trainerTrainings button click', () => {
    spyOn(dialog, 'open').and.stub();
    component.trainerTrainings();
    expect(dialog.open).toHaveBeenCalledWith(TrainerTrainingRequestBoxComponent, {
      data: undefined,
    });
  });

  it('should clear local storage and navigate to home on closeSession button click', () => {
    spyOn(localStorage, 'clear').and.stub();
    spyOn(router, 'navigate').and.stub();
    component.closeSession();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

});
