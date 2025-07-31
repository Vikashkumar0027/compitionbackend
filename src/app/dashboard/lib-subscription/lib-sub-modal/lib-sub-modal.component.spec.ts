import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibSubModalComponent } from './lib-sub-modal.component';

describe('LibSubModalComponent', () => {
  let component: LibSubModalComponent;
  let fixture: ComponentFixture<LibSubModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibSubModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibSubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
