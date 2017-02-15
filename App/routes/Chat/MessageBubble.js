// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

type MessageBubbleProps = {
  isOwn: boolean,
  text: string
}

const MessageBubble = ({ isOwn, text }: MessageBubbleProps) => {
  const viewStyle = {};
  const textStyle = {}
  if(isOwn) {
    Object.assign(viewStyle, styles.ownTextView);
    Object.assign(textStyle, styles.ownText);
  }
  return (
    <View style={{ ...styles.textView, ...viewStyle }}>
      <Text style={{ ...styles.text, ...textStyle }}>{text}</Text>
    </View>
  );
}

export default MessageBubble;
