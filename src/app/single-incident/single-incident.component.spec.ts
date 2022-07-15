import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleIncidentComponent } from './single-incident.component';

describe('SingleIncidentComponent', () => {
  let component: SingleIncidentComponent;
  let fixture: ComponentFixture<SingleIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
