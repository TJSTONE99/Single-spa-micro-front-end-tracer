import { Component, OnInit } from '@angular/core';
import { EventBusService } from './services/eventBus/event-bus.service';
import { WebsocketServiceService } from './services/websocket/websocket-service.service'

@Component({
  selector: 'form-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form-app';
  constructor (private socket:WebsocketServiceService, private eventBus: EventBusService) {}

  ngOnInit(): void{
    if (!this.socket.isConnected) {
      this.socket.connect();
      this.eventBus.ngOnInit()
    }
  }
}
