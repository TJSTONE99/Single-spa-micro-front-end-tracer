import { Injectable } from '@angular/core'
import { WebSocketSubject } from 'rxjs/webSocket'
import { environment } from '../../../environments/environment'
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../../store/model'
import { MessagesActions } from '../../store/messages/messages.actions'
import { UserActions } from '../../store/users/user-actions'

export interface message{
  action:string,
  params?:{}
}

export interface recievedMessage{
  response:string,
  body:{}
}

@Injectable({
  providedIn: 'root'
})

export class WebsocketServiceService {
  private socket$: WebSocketSubject<message>
  public isConnected = false
  private timeout

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private messageActions: MessagesActions,
    private userActions: UserActions
  ) {  }

  public connect(): void {
    clearTimeout(this.timeout)
    this.socket$ = new WebSocketSubject(environment.websocketConnectionURL)

    this.socket$
      .subscribe(
        (message:any) => {
          console.log('got message', message)
          switch (message.response) {
            case '_initialise':
              this.sendMessage('_listAllClients', message.response)
              break
            case '_listAllClients':
              this.ngRedux.dispatch(this.userActions.update(UserActions.GET_ALL_USERS, message.body.clients))
              break
            case '_clientAddedToRoom':
              this.ngRedux.dispatch(this.userActions.update(UserActions.ADD_CLIENT_TO_ROOM, message.body.client))
              break
            case '_clientRemovedFromRoom':
              this.ngRedux.dispatch(this.userActions.update(UserActions.REMOVE_CLIENT_FROM_ROOM, message.body.client))
            case '_sendMessageToRecipent':
              this.ngRedux.dispatch(this.userActions.update(MessagesActions.SEND_MESSAGE, {value: message.body.message.value, sentBy: message.body.message.senderID}))
              break
            case '_recievedMessageFromClient':
              this.ngRedux.dispatch(this.userActions.update(MessagesActions.RECIEVED_MESSAGE, {value: message.body.message.value, sentBy: message.body.message.senderClientID}))
              break
          }
        },
        (err) => {
          this.isConnected = false
          this.dispose()
          // console.error('Websocket Error', err)
          this.timeout = setTimeout(() => {
            this.connect()
          }, 2000)
        }
      )
    this.isConnected = true
  }

  public sendMessage(_action:string, process?:{}): void{
    this.socket$.next({
      action:_action,
      params: process
    })
  }

  public disconnect(): void {
    this.dispose()
  }

  public dispose(): void {
    this.socket$.unsubscribe()
    this.isConnected = false
  }

}
