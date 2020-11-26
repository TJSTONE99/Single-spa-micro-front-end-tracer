import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { SingleSpaProps, singleSpaPropsSubject } from '../../../single-spa/single-spa-props';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class EventbusService {

  subscription: Subscription
  singleSpaProps: SingleSpaProps
  hiddenComponent: BehaviorSubject<boolean>
  connectedClientID: BehaviorSubject<string>

  constructor(private websocket: WebsocketService) { 
  }

  ngOnInit(){
    this.hiddenComponent = new BehaviorSubject<boolean>(false)
    this.connectedClientID = new BehaviorSubject<string>('')

    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.scanForEvents(props)
      }
    )
  }

  private scanForEvents(props:SingleSpaProps){
    props['EventBus'].on('msgFromForm',(payload)=>{
      if (payload.status == 'open')
      {
        if (payload.connectedClientID) this.setConnectClientValue(payload.connectedClientID)
        this.setHiddenValue(true)
      }
      else
      {
        this.setHiddenValue(false)
      }
    });
  }

  setHiddenValue(newValue:boolean): void {
    this.hiddenComponent.next(newValue);
  }

  getHiddenValue(): Observable<boolean> {
    return from(this.hiddenComponent);
  }

  setConnectClientValue(newValue:string)
  {
    this.connectedClientID.next(newValue)
  }

  getConnectedClientValue(): Observable<string>{
    return from(this.connectedClientID)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
