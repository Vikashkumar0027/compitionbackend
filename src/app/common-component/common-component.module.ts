import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ConfirmModalComponent,
    ChangePassComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule, NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  exports:[
    ChangePassComponent,ProfileComponent
  ]
})
export class CommonComponentModule { }
