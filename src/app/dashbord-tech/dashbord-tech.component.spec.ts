import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordTechComponent } from './dashbord-tech.component';

describe('DashbordTechComponent', () => {
  let component: DashbordTechComponent;
  let fixture: ComponentFixture<DashbordTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
