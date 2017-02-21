// @flow

import React from 'react';
import {  ScrollView } from 'react-native';
import AutoScroll from 'react-native-auto-scroll';

import MessageRow from './MessageRow';
import type { User, Message } from '../../types.js';

type ChatMessagesProps = {
  authenticatedUser: User,
  chatMessages: Array<Message>,
}

const ChatMessages = ({ authenticatedUser, chatMessages }: ChatMessagesProps) => (
  <AutoScroll
    style={{ flex: 1, backgroundColor: 'white' }}
    contentContainerStyle={{ alignItems: 'stretch' }}
  >
    {chatMessages.map((msg, idx) => (
      <MessageRow
        username={msg.sender_username}
        isOwn={authenticatedUser.username===msg.sender_username}
        text={msg.text}
        key={idx}
      />
    ))}
  </AutoScroll>
);

export default ChatMessages;
