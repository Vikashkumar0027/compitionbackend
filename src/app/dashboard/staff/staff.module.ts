import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff/staff.component';
import { StaffModalComponent } from './staff-modal/staff-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffViewComponent } from './staff-view/staff-view.component';


@NgModule({
  declarations: [
    StaffComponent,
    StaffModalComponent,
    StaffViewComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StaffModule { }
