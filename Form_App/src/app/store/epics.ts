import { combineEpics } from 'redux-observable'
import { MessagesEpics } from './messages/messages-epics.service'
import { UserEpics } from './users/users-epics.service'

export const rootEpic = combineEpics<any>(
  MessagesEpics,
  UserEpics
)
