import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPswFormComponent } from './reset-psw-form.component';

describe('ResetPswFormComponent', () => {
  let component: ResetPswFormComponent;
  let fixture: ComponentFixture<ResetPswFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPswFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPswFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
