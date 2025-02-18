import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionComponent } from './admission/admission.component';
import { AdmissionModalComponent } from './admission-modal/admission-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdmissionComponent,
    AdmissionModalComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdmissionModule { }
