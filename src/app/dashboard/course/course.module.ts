import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseModalComponent } from './course-modal/course-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonComponentModule } from '../../common-component/common-component.module';


@NgModule({
  declarations: [
    CourseComponent,
    CourseModalComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,CommonComponentModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class CourseModule { }
