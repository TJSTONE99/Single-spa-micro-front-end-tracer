import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store/model';
import { MessagesActions } from 'src/app/store/messages/messages.actions';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserActions } from 'src/app/store/users/user-actions';
import { WebsocketServiceService } from 'src/app/services/websocket/websocket-service.service';
import { EventBusService } from 'src/app/services/eventBus/event-bus.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions:MessagesActions,
    private activatedRoute: ActivatedRoute,
    private websocket: WebsocketServiceService,
    private eventBus: EventBusService
    ) { }
  $messages: Observable<[]>
  selectedUser: {
    clientID: string
    clientName: string
  }
  form:FormGroup = new FormGroup({
    message: new FormControl('',[
      Validators.required
    ])
  })
  connectedClientID:any

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.connectedClientID = paramsId.id
      this.ngRedux.dispatch(this.actions.update(UserActions.GET_USER_BY_ID, {value: this.connectedClientID})).data
      this.eventBus.sendMsg({status: 'open', connectedClientID: this.connectedClientID})
    })
    this.$messages = this.ngRedux.select(state=> state.messages).pipe(
      map(messages => messages.messages)
    )

    this.ngRedux.select(state=> state.users.chattingTo).subscribe(data=>{
      this.selectedUser = data
    })
  }

  onSubmit(){
    if (this.form.valid){
      this.websocket.sendMessage('_sendMessageToRecipent', {recipentClientID:this.connectedClientID, value:this.form.value.message})
      this.form.reset()
    }
  }

  clearDetails(): void{
    this.eventBus.sendMsg({status: 'closed'})
  }

}
