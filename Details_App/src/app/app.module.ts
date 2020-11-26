import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EventbusService } from './services/eventBus/eventbus.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [EventbusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
