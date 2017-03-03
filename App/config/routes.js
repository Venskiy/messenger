import React from 'react';

import Login from '../routes/Login';
import Home from '../routes/Home';
import Chat from '../routes/Chat'

export const routes = {
  getLoginRoute() {
    return {
      title: 'Login',
      component: Login,
    }
  },
  getHomeRoute() {
    return {
      title: 'Home',
      component: Home,
    };
  },
  getChatRoute(chat) {
    return {
      title: chat.interlocutor_username,
      component: Chat,
      passProps: { chatId: chat.id },
    };
  }
};

export default routes;
