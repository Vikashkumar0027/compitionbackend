import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionModalComponent } from './admission-modal.component';

describe('AdmissionModalComponent', () => {
  let component: AdmissionModalComponent;
  let fixture: ComponentFixture<AdmissionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmissionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
