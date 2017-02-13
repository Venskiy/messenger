import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';

const initialState = {
  chats: [],
  chatsFetchFailedErrorMessage: '',
  messages: {},
  messagedFetchFailedErrorMessage: ''
}

export function messenger(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHATS_FETCH_SUCCEEDED:
      return Object.assign({}, state, { chats: action.chats });
    case types.CHATS_FETCH_FAILED:
      return Object.assign({}, state, { chatsFetchFailedErrorMessage: action.errorMessage});
    case types.MESSAGES_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        messages: Object.assign({}, state.messages, { [action.chatId]: action.messages })
      });
    case types.MESSAGES_FETCH_FAILED:
      return Object.assign({}, state, { messagedFetchFailedErrorMessage: action.errorMessage});
    default:
      return state;
  }
}
