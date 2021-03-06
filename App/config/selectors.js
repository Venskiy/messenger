import FullState from '../reducers/mainReducer';

export const getSortedChats = (state: FullState) => {
  return state.home.chats.sort((chat1, chat2) => {
    return (new Date(chat1.last_message_timestamp)) < (new Date(chat2.last_message_timestamp));
  });
}

export const getChatById = (state: FullState, chatId: number | string) => {
  return state.home.chats.find(chat => chat.id.toString() === chatId.toString());
}
