import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterComponent } from './chapter/chapter.component';
import { AddchapterComponent } from './addchapter/addchapter.component';


@NgModule({
  declarations: [
    ChapterComponent,
    AddchapterComponent
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule
  ]
})
export class ChapterModule { }
