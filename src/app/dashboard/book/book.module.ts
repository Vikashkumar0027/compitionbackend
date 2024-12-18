import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book/book.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BookModalComponent } from './book-modal/book-modal.component';


@NgModule({
  declarations: [
    BookComponent,BookModalComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,CommonComponentModule,
    ReactiveFormsModule,FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class BookModule { }
