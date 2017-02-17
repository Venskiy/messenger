// @flow

import * as types from './actionTypes';
import type { ChatType, Message } from '../types';

type FetchChats = { type: 'CHATS_FETCH_REQUESTED' };
type PutChats = { type: 'PUT_CHATS', chats: Array<ChatType> };
type SetChatsFetchFailedErrorMessage = { type: 'SET_CHATS_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string | Object };
type UpdateChatLastMessage = { type: 'UPDATE_CHAT_LAST_MESSAGE', chatId: number | string, senderId: number | string, message: Message };

// export type HomeAction = PutChats | SetChatsFetchFailedErrorMessage | UpdateChatLastMessage | any;
export type HomeAction = UpdateChatLastMessage | any;

export const fetchChats = (): FetchChats => ({ type: types.CHATS_FETCH_REQUESTED });
export const putChats = (chats: Array<ChatType>): PutChats => ({ type: types.PUT_CHATS, chats: chats });
export const setChatsFetchFailedErrorMessage = (errorMessage: string | Object): SetChatsFetchFailedErrorMessage => ({
  type: types.SET_CHATS_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage
});
export const updateChatLastMessage = (chatId: number | string, senderId: number | string, message: Message): UpdateChatLastMessage => ({
  type: types.UPDATE_CHAT_LAST_MESSAGE,
  chatId: chatId,
  senderId: senderId,
  message: message,
});
