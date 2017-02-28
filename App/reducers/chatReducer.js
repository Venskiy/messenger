// @flow

import * as types from '../actions/actionTypes';
import type { ChatAction } from '../actions/chatActions';
import type { Messages, Message } from  '../types';

const initialState: ChatState = {
  messages: {},
  messagesFetchFailedErrorMessage: ''
}

export type ChatState = {
  messages:  Messages,
  messagesFetchFailedErrorMessage: string | Object
}

export const chatReducer = (state: ChatState = initialState, action: ChatAction | any = {}): ChatState => {
  switch (action.type) {
    case types.PUT_CHAT_MESSAGES:
      return { ...state, messages: { ...state.messages, [action.chatId]: action.messages } };
    case types.SET_MESSAGES_FETCH_FAILED_ERROR_MESSAGE:
      return { ...state, messagesFetchFailedErrorMessage: action.errorMessage };
    case types.RECIEVE_CHAT_MESSAGE:
      return { ...state, messages: {
        ...state.messages, [action.chatId]: state.messages[action.chatId].concat(action.message)
      }};
    case types.READ_CHAT_MESSAGES:
      return { ...state, messages: {
        ...state.messages,
        [action.chatId]: state.messages[action.chatId].map(message => message.is_read ? message : {
          ...message,
          is_read: true,
        }),
      }};
    default:
      return state;
  }
}
