import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceConfigurationComponent } from './piece-configuration.component';

describe('PieceConfigurationComponent', () => {
  let component: PieceConfigurationComponent;
  let fixture: ComponentFixture<PieceConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieceConfigurationComponent],
    });
    fixture = TestBed.createComponent(PieceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
