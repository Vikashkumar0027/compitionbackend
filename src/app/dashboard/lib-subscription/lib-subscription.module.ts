import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibSubscriptionRoutingModule } from './lib-subscription-routing.module';
import { LibSubscriptionComponent } from './lib-subscription/lib-subscription.component';
import { LibSubModalComponent } from './lib-sub-modal/lib-sub-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibSubscriptionComponent,
    LibSubModalComponent
  ],
  imports: [
    CommonModule,
    LibSubscriptionRoutingModule,FormsModule,
        ReactiveFormsModule,
  ]
})
export class LibSubscriptionModule { }
