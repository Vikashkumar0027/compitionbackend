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
      {path: 'subAdmin',loadChildren: () =>import('./sub-admin/sub-admin.module').then((m) => m.SubAdminModule), 
        // canActivate: [CheckSubPlanGuard]
        } ,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
