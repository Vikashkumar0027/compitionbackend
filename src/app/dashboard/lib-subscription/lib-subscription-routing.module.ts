import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibSubscriptionComponent } from './lib-subscription/lib-subscription.component';

const routes: Routes = [
  {path:'',component:LibSubscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibSubscriptionRoutingModule { }
