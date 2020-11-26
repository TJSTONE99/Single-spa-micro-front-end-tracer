import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReduxStoreModule } from './store/module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store';
import { MessagesActions } from './store/messages/messages.actions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { UserActions } from './store/users/user-actions';
import { EventBusService } from './services/eventBus/event-bus.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ChatViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    ReduxStoreModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [MessagesActions, UserActions, EventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
