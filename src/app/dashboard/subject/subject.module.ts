import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject/subject.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddsubjectComponent } from './addsubject/addsubject.component';


@NgModule({
  declarations: [
    SubjectComponent,
    AddsubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,CommonComponentModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class SubjectModule { }
