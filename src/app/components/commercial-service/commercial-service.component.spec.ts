import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialServiceComponent } from './commercial-service.component';

describe('CommercialServiceComponent', () => {
  let component: CommercialServiceComponent;
  let fixture: ComponentFixture<CommercialServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommercialServiceComponent]
    });
    fixture = TestBed.createComponent(CommercialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
