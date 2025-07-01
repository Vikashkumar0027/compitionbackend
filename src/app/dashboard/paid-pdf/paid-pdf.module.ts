import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaidPdfRoutingModule } from './paid-pdf-routing.module';

import { PaidpdfComponent } from './paidpdf/paidpdf.component';
import { PaidpdfModalComponent } from './paidpdf-modal/paidpdf-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    PaidpdfComponent,
    PaidpdfModalComponent
  ],
  imports: [
    CommonModule,
    PaidPdfRoutingModule,  ReactiveFormsModule,
            NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PaidPdfModule { }
