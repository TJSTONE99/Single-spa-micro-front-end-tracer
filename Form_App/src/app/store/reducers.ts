import { combineReducers } from 'redux'
import { createMessagesReducer } from './messages/messages-reducer'
import { createUsersReducer } from './users/users-reducer'
export const rootReducer = combineReducers({
    messages: createMessagesReducer(),
    users: createUsersReducer()
})