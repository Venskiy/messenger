import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { api } from '../services';
import * as types from '../actions/actionTypes';

function* fetchChats(action) {
  try {
    const chats = yield call(api.fetchChats);
    yield put({type: types.CHATS_FETCH_SUCCEEDED, chats: chats});
  } catch (e) {
    yield put({type: types.CHATS_FETCH_FAILED, message: e});
  }
}

function* mySaga() {
  yield takeLatest(types.CHATS_FETCH_REQUESTED, fetchChats);
}

export default mySaga;
