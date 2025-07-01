import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidpdfComponent } from './paidpdf.component';

describe('PaidpdfComponent', () => {
  let component: PaidpdfComponent;
  let fixture: ComponentFixture<PaidpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidpdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaidpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
