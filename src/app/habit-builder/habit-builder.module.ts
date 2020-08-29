import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../store/service/api.service';

import { PanelComponent } from './panel/panel.component';
import { JournalComponent } from './journal/journal.component';

@NgModule({
  declarations: [
    PanelComponent,
    JournalComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports: [
    PanelComponent
  ],

  providers: [
    ApiService,
  ]


})
export class HabitBuilderModule { }
