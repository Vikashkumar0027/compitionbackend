import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBatchComponent } from './test-batch.component';

describe('TestBatchComponent', () => {
  let component: TestBatchComponent;
  let fixture: ComponentFixture<TestBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
