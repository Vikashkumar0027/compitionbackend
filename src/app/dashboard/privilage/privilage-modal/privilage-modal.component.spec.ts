import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilageModalComponent } from './privilage-modal.component';

describe('PrivilageModalComponent', () => {
  let component: PrivilageModalComponent;
  let fixture: ComponentFixture<PrivilageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivilageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
