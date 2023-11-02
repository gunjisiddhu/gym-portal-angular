import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinUsComponent} from './join-us.component';
import {NavbarComponent} from "../../shared-module/navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";

describe('JoinUsComponent', () => {
  let component: JoinUsComponent;
  let fixture: ComponentFixture<JoinUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinUsComponent, NavbarComponent],
      imports:[MatToolbarModule,
        MatIconModule,
        MatCardModule
      ]

    });
    fixture = TestBed.createComponent(JoinUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
