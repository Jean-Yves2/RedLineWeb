import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierClientComponent } from './dossier-client.component';

describe('DossierClientComponent', () => {
  let component: DossierClientComponent;
  let fixture: ComponentFixture<DossierClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DossierClientComponent]
    });
    fixture = TestBed.createComponent(DossierClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
