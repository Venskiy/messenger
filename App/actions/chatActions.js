// @flow

import * as types from './actionTypes';
import type { Message } from '../types';

type FetchChatMessages = { type: 'MESSAGES_FETCH_REQUESTED', chatId: number | string };
type PutChatMessages = { type: 'PUT_CHAT_MESSAGES', chatId: number | string, messages:  Array<Message> };
type SetMessagesFetchFailedErrorMessage = { type: 'SET_MESSAGES_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string | Object };
type RecieveChatMessage = { type: 'RECIEVE_CHAT_MESSAGE', chatId: number | string, message: Message };

export type ChatAction = FetchChatMessages | PutChatMessages | SetMessagesFetchFailedErrorMessage | RecieveChatMessage | any;

export const fetchChatMessages = (chatId: number | string): FetchChatMessages => ({
  type: types.MESSAGES_FETCH_REQUESTED,
  chatId: chatId
});
export const putChatMessages = (chatId: number | string, messages:  Array<Message>): PutChatMessages => ({
  type: types.PUT_CHAT_MESSAGES,
  chatId: chatId,
  messages: messages
});
export const setMessagesFetchFailedErrorMessage = (errorMessage: string | Object): SetMessagesFetchFailedErrorMessage => ({
  type: types.SET_MESSAGES_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage
});
export const recieveChatMessage = (chatId: number | string, message: Message): RecieveChatMessage => ({
  type: types.RECIEVE_CHAT_MESSAGE,
  chatId: chatId,
  message: message
});
