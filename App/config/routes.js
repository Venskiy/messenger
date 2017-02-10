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
  getChatRoute() {
    return {
      title: 'Chat',
      component: Chat
    };
  }
};

export default routes;
