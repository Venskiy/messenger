import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Home from './routes/Home';
import Chat from './routes/Chat';

export default class Index extends Component {
  render() {
    return (
      <Chat />
    );
  }
}
