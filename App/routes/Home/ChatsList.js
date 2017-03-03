// @flow

import React from 'react';
import { StyleSheet, View, ScrollView, NavigatorIOS } from 'react-native';
import { Content } from 'native-base';

import ChatRow from './ChatRow';
import routes from '../../config/routes';
import type { ChatType } from '../../types.js';

type ChatsListProps = {
  navigator: NavigatorIOS,
  chats: Array<ChatType>,
}

const ChatsList = ({ chats, navigator }: ChatsListProps) => (
  <Content>
    {chats.map((chat, idx) => (
      <ChatRow
        key={idx}
        chat={chat}
        onSelectChat={() => navigator.push(routes.getChatRoute(chat))}
      />
    ))}
  </Content>
);

export default ChatsList;
