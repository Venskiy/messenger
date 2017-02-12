import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  <View style={styles.container}>
    <Text style={styles.text}>{props.interlocutor_username}</Text>
    <Text style={styles.text}>{props.last_message}</Text>
  </View>
);

export default Row;
