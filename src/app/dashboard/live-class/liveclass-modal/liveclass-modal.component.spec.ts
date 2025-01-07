import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveclassModalComponent } from './liveclass-modal.component';

describe('LiveclassModalComponent', () => {
  let component: LiveclassModalComponent;
  let fixture: ComponentFixture<LiveclassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveclassModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveclassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
