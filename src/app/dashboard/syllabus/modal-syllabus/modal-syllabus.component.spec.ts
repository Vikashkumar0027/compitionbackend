import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSyllabusComponent } from './modal-syllabus.component';

describe('ModalSyllabusComponent', () => {
  let component: ModalSyllabusComponent;
  let fixture: ComponentFixture<ModalSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSyllabusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
