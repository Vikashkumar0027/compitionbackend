import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post/post.component';
import { ModalPostComponent } from './modal-post/modal-post.component';
import { CommonComponentModule } from '../../common-component/common-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    PostComponent,
    ModalPostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,CommonComponentModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PostModule { }
