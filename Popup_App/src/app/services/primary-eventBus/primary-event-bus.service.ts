import { Injectable, OnInit } from '@angular/core';
import { SingleSpaProps, singleSpaPropsSubject } from '../../../single-spa/single-spa-props';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimaryEventBusService{
  singleSpaProps: SingleSpaProps
  subscription: Subscription
  constructor() { 
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
      }
    );
  }

  sendMsg(value){
    this.singleSpaProps['EventBus'].emit({name:'msgFromPopup',data:value});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
