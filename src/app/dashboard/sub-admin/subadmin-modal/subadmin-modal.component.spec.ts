import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminModalComponent } from './subadmin-modal.component';

describe('SubadminModalComponent', () => {
  let component: SubadminModalComponent;
  let fixture: ComponentFixture<SubadminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubadminModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubadminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
