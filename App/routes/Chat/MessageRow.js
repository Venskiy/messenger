// @flow

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import MessageBubble from './MessageBubble';

const styles = {
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  pad: {
    width: 0,
    height: 0,
  },
};

type MessageRowProps = {
  username: string,
  isOwn: boolean,
  text: string,
}

const MessageRow = ({ username, isOwn, text }: MessageRowProps) => {
  return isOwn ? (
    <View style={styles.container}>
      <View username={username} style={{ ...styles.pad, marginRight: 10 }} />
      <View style={{ flex: 1 }} />
      <MessageBubble isOwn={isOwn} text={text} />
    </View>
  ) : (
    <View style={styles.container}>
      <View username={username} style={{ ...styles.pad, marginRight: 10 }} />
      <MessageBubble isOwn={isOwn} text={text} />
      <View style={{ flex: 1 }} />
      <View style={{ ...styles.pad, marginLeft: 10 }} />
    </View>
  );
}

export default MessageRow;
