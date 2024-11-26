import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpractComponent } from './setpract.component';

describe('SetpractComponent', () => {
  let component: SetpractComponent;
  let fixture: ComponentFixture<SetpractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetpractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetpractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
