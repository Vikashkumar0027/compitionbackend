import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';

const routes: Routes = [
    {
      path: '',
      component: ClassComponent,
      data: {
        title:'class'
      },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
