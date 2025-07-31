import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibSubscriptionComponent } from './lib-subscription.component';

describe('LibSubscriptionComponent', () => {
  let component: LibSubscriptionComponent;
  let fixture: ComponentFixture<LibSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
