import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilFormComponent } from './update-profil-form.component';

describe('UpdateProfilFormComponent', () => {
  let component: UpdateProfilFormComponent;
  let fixture: ComponentFixture<UpdateProfilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfilFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
