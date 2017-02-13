import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { api } from '../services';
import * as types from '../actions/actionTypes';

function* fetchChats(action) {
  try {
    const chats = yield call(api.fetchChats);
    yield put({type: types.CHATS_FETCH_SUCCEEDED, chats: chats});
  } catch (e) {
    yield put({type: types.CHATS_FETCH_FAILED, errorMessage: e});
  }
}

function* fetchMessages(action) {
  try {
    const response = yield call(api.fetchMessages, action.payload.chatId);
    yield put({
      type: types.MESSAGES_FETCH_SUCCEEDED,
      messages: response.chat_messages,
      chatId: action.payload.chatId
    });
  } catch (e) {
    yield put({type: types.MESSAGES_FETCH_FAILED, errorMessage: e});
  }
}

function* mySaga() {
  yield takeLatest(types.CHATS_FETCH_REQUESTED, fetchChats);
  yield takeLatest(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

export default mySaga;
