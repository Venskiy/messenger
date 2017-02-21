// @flow

import React from 'react';
import { Content } from 'native-base';

import UserRow from './UserRow';
import type { User } from '../../types';

type UsersListProps = {
  users: Array<User>,
}

const UsersList = ({ users }: UsersListProps) => (
  <Content>
    {users.map((user, idx) => (
      <UserRow user={user} key={idx} />
    ))}
  </Content>
);

export default UsersList;
