import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviouspaperComponent } from './previouspaper.component';

describe('PreviouspaperComponent', () => {
  let component: PreviouspaperComponent;
  let fixture: ComponentFixture<PreviouspaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviouspaperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviouspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
