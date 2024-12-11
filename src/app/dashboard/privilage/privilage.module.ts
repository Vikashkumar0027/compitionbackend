import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivilageRoutingModule } from './privilage-routing.module';
import { PrivilageComponent } from './privilage/privilage.component';
import { PrivilageModalComponent } from './privilage-modal/privilage-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrivilageComponent,
    PrivilageModalComponent
  ],
  imports: [
    CommonModule,
    PrivilageRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class PrivilageModule { }
