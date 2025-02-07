import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicComponent } from './topic/topic.component';
import { TopicmodalComponent } from './topicmodal/topicmodal.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    TopicComponent,
    TopicmodalComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    CommonComponentModule,
        ReactiveFormsModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class TopicsModule { }
