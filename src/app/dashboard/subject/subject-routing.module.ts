import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
    data: {
      title:'subject'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
