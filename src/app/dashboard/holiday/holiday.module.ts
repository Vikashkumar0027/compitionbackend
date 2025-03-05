import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayRoutingModule } from './holiday-routing.module';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayModalComponent } from './holiday-modal/holiday-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HolidayComponent,
    HolidayModalComponent
  ],
  imports: [
    CommonModule,
    HolidayRoutingModule,
    ReactiveFormsModule
  ]
})
export class HolidayModule { }
