import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { subadminGuard } from '../guard/subadmin/subadmin.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, data: { title: 'dashboard' }, children: [
      { path: '', component: HomeComponent },
      // {path: '', redirectTo: 'home', pathMatch: 'full'},,canActivate:[subadminGuard]
      { path: 'home', component: HomeComponent },
      { path: 'subAdmin', loadChildren: () => import('./sub-admin/sub-admin.module').then((m) => m.SubAdminModule), canActivate: [subadminGuard] },
      { path: 'course', loadChildren: () => import('./course/course.module').then((m) => m.CourseModule), canActivate: [subadminGuard] },
      { path: 'course/subject/:id', loadChildren: () => import('./subject/subject.module').then((m) => m.SubjectModule) },
      { path: 'subject/chapter', loadChildren: () => import('./chapter/chapter.module').then((m) => m.ChapterModule) },
      { path: 'chapter/topic', loadChildren: () => import('./topics/topics.module').then((m) => m.TopicsModule) },
      { path: 'syllabus', loadChildren: () => import('./syllabus/syllabus.module').then((m) => m.SyllabusModule), canActivate: [subadminGuard] },
      { path: 'previous_paper', loadChildren: () => import('./previous-paper/previous-paper.module').then((m) => m.PreviousPaperModule), canActivate: [subadminGuard] },
      { path: 'post', loadChildren: () => import('./post/post.module').then((m) => m.PostModule), canActivate: [subadminGuard] },
      { path: 'privilage', loadChildren: () => import('./privilage/privilage.module').then((m) => m.PrivilageModule), canActivate: [subadminGuard] },
      { path: 'online-test', loadChildren: () => import('./online-test/online-test.module').then((m) => m.OnlineTestModule), canActivate: [subadminGuard] },
      { path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule), canActivate: [subadminGuard] },
      { path: 'book', loadChildren: () => import('./book/book.module').then((m) => m.BookModule), canActivate: [subadminGuard] },
      { path: 'payment', loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule), canActivate: [subadminGuard] },
      { path: 'live_class', loadChildren: () => import('./live-class/live-class.module').then((m) => m.LiveClassModule), canActivate: [subadminGuard] },
      { path: 'class', loadChildren: () => import('./class/class.module').then((m) => m.ClassModule), canActivate: [subadminGuard] },
      { path: 'fee', loadChildren: () => import('./fee/fee.module').then((m) => m.FeeModule), canActivate: [subadminGuard] },
      { path: 'fee_deposit', loadChildren: () => import('./fee-deposit/fee-deposit.module').then((m) => m.FeeDepositModule), canActivate: [subadminGuard] },


      { path: 'admission', loadChildren: () => import('./admission/admission.module').then((m) => m.AdmissionModule), canActivate: [subadminGuard] },
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
