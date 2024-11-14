import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAdminRoutingModule } from './sub-admin-routing.module';
import { SubadminComponent } from './subadmin/subadmin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SubadminModalComponent } from './subadmin-modal/subadmin-modal.component';


@NgModule({
  declarations: [
    SubadminComponent,SubadminModalComponent
  ],
  imports: [
    CommonModule,
    SubAdminRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class SubAdminModule { }
