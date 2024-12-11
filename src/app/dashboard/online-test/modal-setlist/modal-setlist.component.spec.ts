import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetlistComponent } from './modal-setlist.component';

describe('ModalSetlistComponent', () => {
  let component: ModalSetlistComponent;
  let fixture: ComponentFixture<ModalSetlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSetlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
