import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentComponent } from './incident.component';

describe('IncidentComponentComponent', () => {
  let component: IncidentComponent;
  let fixture: ComponentFixture<IncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
