import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventbusService } from './services/eventBus/eventbus.service';
import { WebsocketService } from './services/websocket/websocket.service';

@Component({
  selector: 'details-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'details-app';
  eventPermitted:boolean
  subscription: Subscription

  constructor (private socket: WebsocketService, private eventBus: EventbusService, private changeref: ChangeDetectorRef) { }

  ngOnInit(): void{
    if (!this.socket.isConnected) {
      this.eventBus.ngOnInit()
      this.socket.connect();
    }

    this.eventPermitted = false

    this.subscription = this.eventBus.getHiddenValue().subscribe((status:boolean)=>{
      this.eventPermitted = status
      this.changeref.detectChanges()
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }
}
