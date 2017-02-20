// @flow

import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import type { User } from '../../types.js';

type UsersListProps = {
  users: Array<User>,
}

const UsersList = ({ users }: UsersListProps) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: '#fff', marginBottom: 50 }}
    contentContainerStyle={{ alignItems: 'stretch' }}
  >
    {users.map((user, idx) => (
      <Text key={idx}>{user.username}</Text>
    ))}
  </ScrollView>
);

export default UsersList;
