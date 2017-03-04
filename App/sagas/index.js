import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { api, cookie } from '../services';
import { TOKEN, SOCKET_ROOT } from '../config/settings';
import { waitForSocketConnection } from '../utils/utils';
import * as types from '../actions/actionTypes';
import {
  putAccessToken,
  putAuthenticatedUser,
  setAuthenticatedUserFetchErrorMessage,
} from '../actions/mainActions';
import {
  putUsers,
  SetUsersFetchFailedErrorMessage,
  addNewChat,
  putChats,
  setChatsFetchFailedErrorMessage
} from '../actions/homeActions';
import { putChatMessages, setMessagesFetchFailedErrorMessage } from '../actions/chatActions';
import * as constants from '../utils/constants';

function* obtainAccessToken(action) {
  try {
    const accessToken = yield call(api.obtainAccessToken, action.username, action.password);
    try {
      const response = yield call(cookie.setAccessToken, accessToken);
      yield put(putAccessToken(accessToken));
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchAccessToken(action) {
  const accessToken = yield call(cookie.getAccessToken);
  yield put(putAccessToken(accessToken));
}

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
    if(response.type === constants.CHAT_ALREADY_EXISTS) {
      alert('You already have chat with this person');
    } else if(response.type === constants.CHAT_NEW) {
      const ws = new WebSocket(`${SOCKET_ROOT}tornado_chat/${response.chat.id}/?user_token=${TOKEN}`);
      ws.onopen = function() {
        ws.send(JSON.stringify({
          type: constants.DISPLAY_CHAT_ON_RECIPIENT_SIDE,
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
    let chatMessages = response.chat_messages;
    chatMessages.reverse();
    yield put(putChatMessages(action.chatId, chatMessages));
  } catch (e) {
    yield put(setMessagesFetchFailedErrorMessage(e));
  }
}

function* mySaga() {
  yield takeLatest(types.OBTAIN_ACCESS_TOKEN, obtainAccessToken)
  yield takeLatest(types.ACCESS_TOKEN_FETCH_REQUESTED, fetchAccessToken);
  yield takeLatest(types.GET_AUTHENTICATED_USER, getAuthenticatedUser);
  yield takeLatest(types.USERS_FETCH_REQUESTED, fetchUsers);
  yield takeLatest(types.CREATE_CHAT_REQUESTED, createChat);
  yield takeLatest(types.CHATS_FETCH_REQUESTED, fetchChats);
  yield takeLatest(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

export default mySaga;
