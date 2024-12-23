import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    ChangePassComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  exports:[
    ChangePassComponent,ProfileComponent
  ]
})
export class CommonComponentModule { }
