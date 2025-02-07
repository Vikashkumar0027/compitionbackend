import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicmodalComponent } from './topicmodal.component';

describe('TopicmodalComponent', () => {
  let component: TopicmodalComponent;
  let fixture: ComponentFixture<TopicmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
