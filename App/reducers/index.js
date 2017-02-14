import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';

const initialState = {
  chats: [
    {
      id: 3,
      interlocutor_id: 2,
      interlocutor_username: 'Venskiy',
      is_interlocutor_typing: false,
      last_message: 'Hello',
      last_message_is_read: true,
      last_message_sender_id: 4,
      last_message_timestamp: '2017-02-08T16:49:45.252364Z'
    }
  ],
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
