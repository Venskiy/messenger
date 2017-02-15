// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    height: 50,
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});

const Toolbar = () => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      selectionColor="rgba(0, 149, 255, 0.95)"
      placeholder="Write a message..."
      blurOnSubmit={false}
      returnKeyType="send"
    />
  </View>
);

export default Toolbar;
