import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilageComponent } from './privilage.component';

describe('PrivilageComponent', () => {
  let component: PrivilageComponent;
  let fixture: ComponentFixture<PrivilageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivilageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
