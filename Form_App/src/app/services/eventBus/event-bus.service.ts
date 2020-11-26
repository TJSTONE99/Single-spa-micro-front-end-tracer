import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';
import { WebsocketServiceService } from '../websocket/websocket-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventBusService implements OnDestroy, OnInit {
  subscription: Subscription
  singleSpaProps: SingleSpaProps
  constructor(private websocket: WebsocketServiceService) { 
  }

  ngOnInit(){
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props
        this.scanForEvents(props)
      }
    )
  }

  private scanForEvents(props:SingleSpaProps){
    props['EventBus'].on('msgFromPopup',(value)=>{
      this.websocket.sendMessage('_initialise', { name: value })
    });
  }

  sendMsg(value){
    this.singleSpaProps['EventBus'].emit({name:'msgFromForm',data:value});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
