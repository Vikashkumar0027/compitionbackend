import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidpdfModalComponent } from './paidpdf-modal.component';

describe('PaidpdfModalComponent', () => {
  let component: PaidpdfModalComponent;
  let fixture: ComponentFixture<PaidpdfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidpdfModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidpdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
