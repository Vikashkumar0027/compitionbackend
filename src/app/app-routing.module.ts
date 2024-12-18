import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginGuard } from './guard/login/login.guard';
import { DashboardGuard } from './guard/dashboard/dashboard.guard';
import { subadminGuard } from './guard/subadmin/subadmin.guard';
// import { subadminGuard } from './guard/subadmin/subadmin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent,canActivate: [LoginGuard]},
  {path:'signUp',component:SignupComponent},
  {path:'dashboard',loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),canActivate: [DashboardGuard,subadminGuard]},

 {path: '**', redirectTo: 'dashboard',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
