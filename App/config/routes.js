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
  getChatRoute(chatId) {
    return {
      title: `Chat ${chatId}`,
      component: Chat,
      passProps: { chatId: chatId }
    };
  }
};

export default routes;
