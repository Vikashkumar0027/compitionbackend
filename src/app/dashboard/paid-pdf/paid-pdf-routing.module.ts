import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidpdfComponent } from './paidpdf/paidpdf.component';

const routes: Routes = [
  { path: "", component: PaidpdfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaidPdfRoutingModule { }
