import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { api } from '../services';
import { TOKEN, SOCKET_ROOT } from '../config/settings';
import { waitForSocketConnection } from '../utils/utils';
import * as types from '../actions/actionTypes';
import { putAuthenticatedUser, setAuthenticatedUserFetchErrorMessage } from '../actions/mainActions';
import {
  putUsers,
  SetUsersFetchFailedErrorMessage,
  addNewChat,
  putChats,
  setChatsFetchFailedErrorMessage
} from '../actions/homeActions';
import { putChatMessages, setMessagesFetchFailedErrorMessage } from '../actions/chatActions';

function* getAuthenticatedUser(action) {
  try {
    const user = yield call(api.getAuthenticatedUser);
    yield put(putAuthenticatedUser(user));
  } catch (e) {
    yield put(setAuthenticatedUserFetchErrorMessage(e));
  }
}

function* fetchUsers(action) {
  try {
    const users = yield call(api.fetchUsers);
    yield put(putUsers(users));
  } catch (e) {
    yield put(setUsersFetchFailedErrorMessage(e));
  }
}

function* createChat(action) {
  try {
    const response = yield call(api.createChat, action.username);
    if(response.type === 'CHAT_ALREADY_EXISTS') {
      alert('You already have chat with this person');
    } else if(response.type === 'CHAT_NEW') {
      const ws = new WebSocket(`${SOCKET_ROOT}tornado_chat/${response.chat.id}/?user_token=${TOKEN}`);
      ws.onopen = function() {
        ws.send(JSON.stringify({
          type: 'DISPLAY_CHAT_ON_RECIPIENT_SIDE',
          chat: response.chat,
        }));
        ws.close();
      };

      yield put(addNewChat(response.chat));
      alert('Chat have been created successfully');
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchChats(action) {
  try {
    const chats = yield call(api.fetchChats);
    yield put(putChats(chats));
  } catch (e) {
    yield put(setChatsFetchFailedErrorMessage(e));
  }
}

function* fetchMessages(action) {
  try {
    const response = yield call(api.fetchMessages, action.chatId);
    yield put(putChatMessages(action.chatId, response.chat_messages));
  } catch (e) {
    yield put(setMessagesFetchFailedErrorMessage(e));
  }
}

function* mySaga() {
  yield takeLatest(types.GET_AUTHENTICATED_USER, getAuthenticatedUser);
  yield takeLatest(types.USERS_FETCH_REQUESTED, fetchUsers);
  yield takeLatest(types.CREATE_CHAT_REQUESTED, createChat);
  yield takeLatest(types.CHATS_FETCH_REQUESTED, fetchChats);
  yield takeLatest(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

export default mySaga;
