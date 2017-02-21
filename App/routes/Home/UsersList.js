// @flow

import React from 'react';
import { Content } from 'native-base';

import UserRow from './UserRow';
import type { User } from '../../types';

type UsersListProps = {
  users: Array<User>,
  onCreateChat: (username: string) => void,
}

const UsersList = ({ users, onCreateChat }: UsersListProps) => (
  <Content>
    {users.map((user, idx) => (
      <UserRow key={idx} user={user} onCreateChat={onCreateChat} />
    ))}
  </Content>
);

export default UsersList;
