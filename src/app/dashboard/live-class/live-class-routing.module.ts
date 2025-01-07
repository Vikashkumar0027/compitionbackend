import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveClassComponent } from './live-class/live-class.component';

const routes: Routes = [
   {
      path: '',
      component: LiveClassComponent,
      data: {
        title:'Live Class'
      },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveClassRoutingModule { }
