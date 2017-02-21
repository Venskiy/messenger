// @flow

import React from 'react';
import { Left, Body, Right, ListItem, Thumbnail, Button, Text } from 'native-base';

import Avatar from '../../components/Avatar';
import type { User } from '../../types.js';

type UserRowProps = {
  user: User,
}

const UserRow = ({ user }: UserRowProps) => (
  <ListItem thumbnail>
    <Left>
      <Avatar username={user.username} />
    </Left>
    <Body>
      <Text style={{ fontSize: 26, fontWeight: '100' }}>{user.username}</Text>
    </Body>
    <Right>
      <Button transparent>
          <Text>Create Chat</Text>
      </Button>
    </Right>
  </ListItem>
);

export default UserRow;
