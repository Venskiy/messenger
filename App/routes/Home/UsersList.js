// @flow

import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import UserRow from './UserRow';
import type { User } from '../../types';

type UsersListProps = {
  users: Array<User>,
}

const UsersList = ({ users }: UsersListProps) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: '#fff', marginBottom: 50 }}
    contentContainerStyle={{ alignItems: 'stretch' }}
  >
    {users.map((user, idx) => (
      <UserRow user={user} key={idx} />
    ))}
  </ScrollView>
);

export default UsersList;
