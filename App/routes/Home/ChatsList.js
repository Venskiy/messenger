// @flow

import React from 'react';
import { StyleSheet, View, ScrollView, NavigatorIOS } from 'react-native';

import ChatRow from './ChatRow';
import Routes from '../../config/routes';
import type { ChatType } from '../../types.js';

type ChatsListProps = {
  navigator: NavigatorIOS,
  chats: Array<ChatType>,
}

const ChatsList = ({ chats, navigator }: ChatsListProps) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: '#fff', marginBottom: 50 }}
    contentContainerStyle={{ alignItems: 'stretch' }}
  >
    {chats.map((chat, idx) => (
      <ChatRow
        chat={chat}
        onSelectChat={() => navigator.push(Routes.getChatRoute(chat))}
        key={idx}
      />
    ))}
  </ScrollView>
);

export default ChatsList;
