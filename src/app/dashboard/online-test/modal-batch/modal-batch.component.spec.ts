import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBatchComponent } from './modal-batch.component';

describe('ModalBatchComponent', () => {
  let component: ModalBatchComponent;
  let fixture: ComponentFixture<ModalBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
