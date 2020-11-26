import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventbusService } from '../../services/eventBus/eventbus.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  constructor(private websocket: WebsocketService, private eventBus: EventbusService) { }
  
  connectedClientID:string
  subscription: Subscription

  ngOnInit(): void {
    this.connectedClientID = ""
    this.subscription = this.eventBus.getConnectedClientValue().subscribe((data:string) => {
      this.connectedClientID = data
    })
  }

  submitSelection(value: string) :void{
    this.websocket.sendMessage('_sendMessageToRecipent', {recipentClientID:this.connectedClientID, value:`Connected User Selected : ${value}`})
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }
}
