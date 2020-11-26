import { Injectable } from '@angular/core'
import { ActionsObservable } from 'redux-observable'
import { MessagesActions } from './messages.actions'

import { map, mergeMap, tap } from 'rxjs/operators'
import { Observable, observable } from 'rxjs'

@Injectable()
export class MessagesEpics {

  constructor() { }


  sendMessage = (action$: ActionsObservable<any>, store) => {
    return action$.ofType(MessagesActions.SEND_MESSAGE)
      .pipe(
        map(({data}) => ({
          type: MessagesActions.GET_ALL_SENT_MESSAGES,
          data: {
            new: data,
            updated: [],
            deleted: []
          }
        }))
      )
  }

  recievedMessage = (action$: ActionsObservable<any>, store) => {
    return action$.ofType(MessagesActions.RECIEVED_MESSAGE)
      .pipe(
        map(({data}) => ({
          type: MessagesActions.GET_ALL_SENT_MESSAGES,
          data: {
            new: data,
            updated: [],
            deleted: []
          }
        }))
      )
  }

}