// @flow

import React from 'react';
import { Image } from 'react-native';

type AvatarProps = {
  username: string,
}

const Avatar = ({ username }: AvatarProps) => (
  <Image
    source={{ uri: `https://sigil.cupcake.io/${username}` }}
    style={{ borderRadius: 28, height: 56, width: 56 }}
  />
);

export default Avatar;
