import React from 'react';
import { Text, View } from 'react-native';

const styles = {
  textView: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  ownTextView: {
    backgroundColor: 'rgba(0, 149, 255, 0.95)',
  },
  text: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
  },
  ownText: {
    color: '#fff',
    textAlign: 'right',
  },
};

const MessageBubble = ({ text }) => (
  <View style={styles.textView}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default MessageBubble;