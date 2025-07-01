import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionComponent } from './admission/admission.component';
import { AdmissionModalComponent } from './admission-modal/admission-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmissionviewComponent } from './admissionview/admissionview.component';


@NgModule({
  declarations: [
    AdmissionComponent,
    AdmissionModalComponent,
    AdmissionviewComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdmissionModule { }
