import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';

const initialState = {
  chats: [],
  chatsFetchFailedErrorMessage: '',
}

export function messenger(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHATS_FETCH_SUCCEEDED:
      return Object.assign({}, state, { chats: action.chats });
    case types.CHATS_FETCH_FAILED:
      return Object.assign({}, state, { chatsFetchFailedErrorMessage: action.message});
    default:
      return state;
  }
}
