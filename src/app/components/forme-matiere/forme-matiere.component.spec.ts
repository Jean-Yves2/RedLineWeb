import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeMatiereComponent } from './forme-matiere.component';

describe('FormeMatiereComponent', () => {
  let component: FormeMatiereComponent;
  let fixture: ComponentFixture<FormeMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormeMatiereComponent]
    });
    fixture = TestBed.createComponent(FormeMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
