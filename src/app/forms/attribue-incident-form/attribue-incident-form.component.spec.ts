import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribueIncidentFormComponent } from './attribue-incident-form.component';

describe('AttribueIncidentFormComponent', () => {
  let component: AttribueIncidentFormComponent;
  let fixture: ComponentFixture<AttribueIncidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttribueIncidentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttribueIncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
