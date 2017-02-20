// @flow

import React from 'react';
import { Image } from 'react-native';

type AvatarProps = {
  username: string,
}

const Avatar = ({ username }: AvatarProps) => (
  <Image
    source={{ uri: `https://sigil.cupcake.io/${username}` }}
    style={{ borderRadius: 25, height: 50, width: 50 }}
  />
);

export default Avatar;
