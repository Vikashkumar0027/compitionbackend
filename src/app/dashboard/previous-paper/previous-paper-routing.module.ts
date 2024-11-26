import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviouspaperComponent } from './previouspaper/previouspaper.component';
import { SetpractComponent } from './setpract/setpract.component';

const routes: Routes = [
  {path:'',component:PreviouspaperComponent},
  {path:':id',component:SetpractComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviousPaperRoutingModule { }
