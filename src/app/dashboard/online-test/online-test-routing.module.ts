import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestBatchComponent } from './test-batch/test-batch.component';
import { TestSubjectComponent } from './test-subject/test-subject.component';
import { TestSetListComponent } from './test-set-list/test-set-list.component';
import { TestQuestionComponent } from './test-question/test-question.component';

const routes: Routes = [
  {path:'',component:TestBatchComponent},
  {path:'subject/:id',component:TestSubjectComponent},
  {path:'setlist/:id',component:TestSetListComponent},
  {path:'qestion/:id',component:TestQuestionComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineTestRoutingModule { }
