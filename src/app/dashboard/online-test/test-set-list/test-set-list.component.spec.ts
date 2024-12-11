import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetListComponent } from './test-set-list.component';

describe('TestSetListComponent', () => {
  let component: TestSetListComponent;
  let fixture: ComponentFixture<TestSetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
