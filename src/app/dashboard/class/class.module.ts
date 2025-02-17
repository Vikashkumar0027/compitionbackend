import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class/class.component';
import { ClassModalComponent } from './class-modal/class-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassComponent,
    ClassModalComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClassModule { }
