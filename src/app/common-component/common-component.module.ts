import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ]
})
export class CommonComponentModule { }
