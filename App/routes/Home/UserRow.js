// @flow

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Avatar from '../../components/Avatar';
import type { User } from '../../types.js';

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

type UserRowProps = {
  user: User,
}

const UserRow = ({ user }: UserRowProps) => (
  <View>
    <Avatar username={user.username} />
    <Text style={styles.text}>{user.username}</Text>
    <Button title="Create Chat" />
  </View>
);

export default UserRow;
