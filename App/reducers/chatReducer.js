// @flow

import * as types from '../actions/actionTypes';
import type { ChatAction } from '../actions/chatActions';
import type { Messages, Message } from  '../types.js';

const initialState: ChatState = {
  messages: {},
  messagesFetchFailedErrorMessage: ''
}

type ChatState = {
  messages: { [key: string]: Messages },
  messagesFetchFailedErrorMessage: string | Object
}

export const chatReducer = (state: ChatState = initialState, action: ChatAction | any = {}): ChatState => {
  switch (action.type) {
    case types.PUT_CHAT_MESSAGES:
      return { ...state, messages: { ...state.messages, [action.chatId]: action.messages } };
    case types.SET_MESSAGES_FETCH_FAILED_ERROR_MESSAGE:
      return { ...state, messagesFetchFailedErrorMessage: action.errorMessage };
    default:
      return state;
  }
}
