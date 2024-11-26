import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetComponent } from './modal-set.component';

describe('ModalSetComponent', () => {
  let component: ModalSetComponent;
  let fixture: ComponentFixture<ModalSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
