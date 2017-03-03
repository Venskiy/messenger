// @flow

import * as types from './actionTypes';
import type { User, ChatType, Message } from '../types';

type FetchUsers = { type: 'USERS_FETCH_REQUESTED' };
type PutUsers = { type: 'PUT_USERS', users: Array<User> };
type SetUsersFetchFailedErrorMessage = { type: 'SET_USERS_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string | Object };
type CreateChat = { type: 'CREATE_CHAT_REQUESTED', username: string };
type AddNewChat = { type: 'ADD_NEW_CHAT', chat: ChatType };
type FetchChats = { type: 'CHATS_FETCH_REQUESTED' };
type PutChats = { type: 'PUT_CHATS', chats: Array<ChatType> };
type SetChatsFetchFailedErrorMessage = { type: 'SET_CHATS_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string | Object };
type UpdateChatLastMessage = { type: 'UPDATE_CHAT_LAST_MESSAGE', chatId: number | string, senderId: number | string, message: Message };
type ReadChatLastMessage = { type: 'READ_CHAT_LAST_MESSAGE', chatId: number | string };
type ChangeIsTypingState = { type: 'CHANGE_IS_TYPING_STATE', chatId: number | string };

// export type HomeAction = PutUsers | SetUsersFetchFailedErrorMessage |
//  PutChats | SetChatsFetchFailedErrorMessage | UpdateChatLastMessage | any;
export type HomeAction = UpdateChatLastMessage | any;

export const fetchUsers = (): FetchUsers => ({ type: types.USERS_FETCH_REQUESTED });
export const putUsers = (users: Array<User>): PutUsers => ({ type: types.PUT_USERS, users: users });
export const setUsersFetchFailedErrorMessage = (errorMessage: string | Object): SetUsersFetchFailedErrorMessage => ({
  type: types.SET_USERS_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage,
});
export const createChat = (username: string): CreateChat => ({ type: types.CREATE_CHAT_REQUESTED, username: username });
export const addNewChat = (chat: ChatType): AddNewChat => ({ type: types.ADD_NEW_CHAT, chat: chat });
export const fetchChats = (): FetchChats => ({ type: types.CHATS_FETCH_REQUESTED });
export const putChats = (chats: Array<ChatType>): PutChats => ({ type: types.PUT_CHATS, chats: chats });
export const setChatsFetchFailedErrorMessage = (errorMessage: string | Object): SetChatsFetchFailedErrorMessage => ({
  type: types.SET_CHATS_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage,
});
export const updateChatLastMessage = (chatId: number | string, senderId: number | string, message: Message): UpdateChatLastMessage => ({
  type: types.UPDATE_CHAT_LAST_MESSAGE,
  chatId: chatId,
  senderId: senderId,
  message: message,
});
export const readChatLastMessage = (chatId: number | string): ReadChatLastMessage => ({
  type: types.READ_CHAT_LAST_MESSAGE,
  chatId: chatId,
});
export const changeIsTypingState = (chatId: number | string): ChangeIsTypingState => ({
  type: types.CHANGE_IS_TYPING_STATE,
  chatId: chatId,
});
