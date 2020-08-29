import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HabitBuilderModule } from './habit-builder/habit-builder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HabitBuilderModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
