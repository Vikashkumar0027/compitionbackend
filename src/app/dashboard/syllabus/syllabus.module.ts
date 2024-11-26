import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SyllabusRoutingModule } from './syllabus-routing.module';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { ModalSyllabusComponent } from './modal-syllabus/modal-syllabus.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    SyllabusComponent,
    ModalSyllabusComponent
  ],
  imports: [
    CommonModule,
    SyllabusRoutingModule,CommonComponentModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class SyllabusModule { }
