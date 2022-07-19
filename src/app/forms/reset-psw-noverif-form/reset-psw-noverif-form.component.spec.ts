import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPswNoverifFormComponent } from './reset-psw-noverif-form.component';

describe('ResetPswNoverifFormComponent', () => {
  let component: ResetPswNoverifFormComponent;
  let fixture: ComponentFixture<ResetPswNoverifFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPswNoverifFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPswNoverifFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
