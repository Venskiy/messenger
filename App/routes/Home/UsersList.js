// @flow

import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import type { User } from '../../types.js';

type UserListProps = {
  users: Array<User>,
}

const UsersList = ({ users }: UsersListProps) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: 'white' }}
    contentContainerStyle={{ alignItems: 'stretch' }}
  >
    <View style={{ height: 90 }} />
    {users.map((user, idx) => (
      <Text key={idx}>{user.username}</Text>
    ))}
  </ScrollView>
);

export default UsersList;
