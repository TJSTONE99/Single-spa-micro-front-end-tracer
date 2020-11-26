import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component'
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'form/:id', component: ChatViewComponent },
  { path: '**', component: EmptyRouteComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
