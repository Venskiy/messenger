import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { api } from '../services';
import * as types from '../actions/actionTypes';
import { putChats, setChatsFetchFailedErrorMessage } from '../actions/homeActions';
import { putChatMessages, setMessagesFetchFailedErrorMessage } from '../actions/chatActions';

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
  yield takeLatest(types.CHATS_FETCH_REQUESTED, fetchChats);
  yield takeLatest(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

export default mySaga;
