// @flow

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Left, Body, Right, ListItem, Thumbnail, Text } from 'native-base';

import Avatar from '../../components/Avatar';
import { getMessageTimestamp } from '../../utils/utils';
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
  onSelectChat: (chat: ChatType) => void
}

const ChatRow = ({ chat, onSelectChat }: ChatRowProps) => (
    <ListItem onPress={() => onSelectChat(chat)} avatar>
      <Left>
        <Thumbnail source={{ uri: `https://sigil.cupcake.io/${chat.interlocutor_username}` }} />
      </Left>
      <Body>
        <Text>{chat.interlocutor_username}</Text>
        {chat.is_interlocutor_typing ? <Text>{chat.interlocutor_username} is typing</Text> : <Text note>{chat.last_message}</Text>}
      </Body>
      <Right>
        <Text note>{getMessageTimestamp(new Date(chat.last_message_timestamp))}</Text>
        {chat.last_message_is_read ? null : <Text>*</Text>}
      </Right>
    </ListItem>
);

export default ChatRow;
