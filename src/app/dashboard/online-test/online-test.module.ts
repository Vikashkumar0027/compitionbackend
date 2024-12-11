import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineTestRoutingModule } from './online-test-routing.module';
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestSetListComponent } from './test-set-list/test-set-list.component';
import { TestSubjectComponent } from './test-subject/test-subject.component';
import { TestBatchComponent } from './test-batch/test-batch.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalBatchComponent } from './modal-batch/modal-batch.component';
import { ModalSetlistComponent } from './modal-setlist/modal-setlist.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    TestQuestionComponent,
    TestSetListComponent,
    TestSubjectComponent,
    TestBatchComponent,
    ModalBatchComponent,
    ModalSetlistComponent
  ],
  imports: [
    CommonModule,
    OnlineTestRoutingModule,CommonComponentModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    CKEditorModule,FormsModule
  ]
})
export class OnlineTestModule { }
