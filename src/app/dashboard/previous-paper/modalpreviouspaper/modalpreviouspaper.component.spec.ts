import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpreviouspaperComponent } from './modalpreviouspaper.component';

describe('ModalpreviouspaperComponent', () => {
  let component: ModalpreviouspaperComponent;
  let fixture: ComponentFixture<ModalpreviouspaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalpreviouspaperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalpreviouspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
