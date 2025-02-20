import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { CommonComponentModule } from '../common-component/common-component.module';

// import { TestBatchComponent } from './onlineTest/test-batch/test-batch.component';
// import { TestSubjectComponent } from './onlineTest/test-subject/test-subject.component';
// import { TestSetListComponent } from './onlineTest/test-set-list/test-set-list.component';
// import { TestQuestionComponent } from './onlineTest/test-question/test-question.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,CommonComponentModule,
    ReactiveFormsModule,FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class DashboardModule { }
