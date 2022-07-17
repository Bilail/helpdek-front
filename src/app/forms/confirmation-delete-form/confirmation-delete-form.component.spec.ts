import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteFormComponent } from './confirmation-delete-form.component';

describe('ConfirmationDeleteFormComponent', () => {
  let component: ConfirmationDeleteFormComponent;
  let fixture: ComponentFixture<ConfirmationDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
