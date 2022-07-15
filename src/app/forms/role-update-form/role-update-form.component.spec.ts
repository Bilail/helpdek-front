import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUpdateFormComponent } from './role-update-form.component';

describe('RoleUpdateFormComponent', () => {
  let component: RoleUpdateFormComponent;
  let fixture: ComponentFixture<RoleUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
