import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveClassRoutingModule } from './live-class-routing.module';
import { LiveClassComponent } from './live-class/live-class.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LiveclassModalComponent } from './liveclass-modal/liveclass-modal.component';


@NgModule({
  declarations: [
    LiveClassComponent,
    LiveclassModalComponent
  ],
  imports: [
    CommonModule,
    LiveClassRoutingModule,
     NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
     CommonComponentModule, ReactiveFormsModule,
  ]
})
export class LiveClassModule { }
