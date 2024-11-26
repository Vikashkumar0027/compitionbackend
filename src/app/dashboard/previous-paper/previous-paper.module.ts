import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviousPaperRoutingModule } from './previous-paper-routing.module';
import { PreviouspaperComponent } from './previouspaper/previouspaper.component';
import { ModalpreviouspaperComponent } from './modalpreviouspaper/modalpreviouspaper.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SetpractComponent } from './setpract/setpract.component';
import { ModalSetComponent } from './modal-set/modal-set.component';


@NgModule({
  declarations: [
    PreviouspaperComponent,
    ModalpreviouspaperComponent,
    SetpractComponent,
    ModalSetComponent
  ],
  imports: [
    CommonModule,
    PreviousPaperRoutingModule,CommonComponentModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PreviousPaperModule { }
