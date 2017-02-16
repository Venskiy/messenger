// @flow

import * as types from '../actions/actionTypes';
import type { HomeAction } from '../actions/homeActions';
import type { ChatType } from  '../types.js';

const initialState: HomeState = {
  chats: [
    {
      id: 3,
      interlocutor_id: 2,
      interlocutor_username: 'Venskiy',
      is_interlocutor_typing: false,
      last_message: 'Hello',
      last_message_is_read: true,
      last_message_sender_id: 4,
      last_message_timestamp: '2017-02-08T16:49:45.252364Z'
    }
  ],
  chatsFetchFailedErrorMessage: '',
};

type HomeState = {
  chats: Array<ChatType>,
  chatsFetchFailedErrorMessage: string | Object
};

export const homeReducer = (state: HomeState = initialState, action: HomeAction = {}): HomeState => {
  switch (action.type) {
    case types.PUT_CHATS:
      return { ...state, chats: action.chats };
    case types.SET_CHATS_FETCH_FAILED_ERROR_MESSAGE:
      return { ...state, chatsFetchFailedErrorMessage: action.errorMessage }
    case types.UPDATE_CHAT_LAST_MESSAGE:
      return {
        ...state,
        chats: state.chats.map(chat => parseInt(chat.id) === parseInt(action.chatId) ? {
          ...chat,
          last_message: action.message.text,
          last_message_is_read: action.message.is_read,
          last_message_sender_id: action.senderId,
          last_message_timestamp: action.message.timestamp
        } : chat)
      };
    default:
      return state;
  }
};
