import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner/banner.component';
import { BannerModalComponent } from './banner-modal/banner-modal.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    BannerComponent,
    BannerModalComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,CommonComponentModule,
        ReactiveFormsModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class BannerModule { }
