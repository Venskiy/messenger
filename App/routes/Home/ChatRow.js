// @flow

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import type { ChatType } from '../../types.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
  },
  text: {
    marginLeft: 12,
    fontSize: 12,
  }
});

type ChatRowProps = {
  chat: ChatType,
  onSelectChat: (chatId: number | string) => void
}

const ChatRow = ({chat, onSelectChat}: ChatRowProps) => (
  <TouchableOpacity style={styles.container} onPress={() => onSelectChat(chat.id)}>
    <Text style={styles.text}>{chat.interlocutor_username}</Text>
    <Text style={styles.text}>{chat.last_message}</Text>
  </TouchableOpacity>
);

export default ChatRow;
