import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title:'dashboard'
    },
    children:[
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path: 'subAdmin',loadChildren: () =>import('./sub-admin/sub-admin.module').then((m) => m.SubAdminModule)} ,
      {path: 'course',loadChildren: () =>import('./course/course.module').then((m) => m.CourseModule)} ,
      {path: 'course/subject/:id',loadChildren: () =>import('./subject/subject.module').then((m) => m.SubjectModule)} ,
      {path: 'subject/chapter/:id',loadChildren: () =>import('./chapter/chapter.module').then((m) => m.ChapterModule)} ,
      {path: 'syllabus',loadChildren: () =>import('./syllabus/syllabus.module').then((m) => m.SyllabusModule)} ,
      {path: 'previous_paper',loadChildren: () =>import('./previous-paper/previous-paper.module').then((m) => m.PreviousPaperModule)} ,
      {path: 'post',loadChildren: () =>import('./post/post.module').then((m) => m.PostModule)} ,
      {path: 'privilage',loadChildren: () =>import('./privilage/privilage.module').then((m) => m.PrivilageModule)} ,
      {path: 'online-test',loadChildren: () =>import('./online-test/online-test.module').then((m) => m.OnlineTestModule)} ,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
