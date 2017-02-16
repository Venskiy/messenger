import React from 'react';
import Home from '../routes/Home';
import Chat from '../routes/Chat'

export const routes = {
  getHomeRoute() {
    return {
      title: 'Home',
      component: Home
    };
  },
  getChatRoute(chat) {
    return {
      title: chat.interlocutor_username,
      component: Chat,
      passProps: { chat: chat }
    };
  }
};

export default routes;
