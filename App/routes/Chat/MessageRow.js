import React from 'react';
import {
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
    width: 40,
    height: 40,
  },
};

type MessageRowProps = {
  username: string,
  text: string,
}

const MessageRow = ({ username, text }) => (
  <View style={styles.container}>
    <View username={username} style={{ ...styles.pad, marginRight: 10 }} />
    <View style={{ flex: 1 }} />
    <MessageBubble text={text} />
  </View>
);

export default MessageRow;
