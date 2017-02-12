import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 12,
    flexDirection: 'column',
  },
  text: {
    marginLeft: 12,
    fontSize: 12,
  }
});

const Row = (props) => (
  <TouchableOpacity style={styles.container} onPress={() => props.onChatOpen(props.id)}>
    <Text style={styles.text}>{props.interlocutor_username}</Text>
    <Text style={styles.text}>{props.last_message}</Text>
  </TouchableOpacity>
);

export default Row;
