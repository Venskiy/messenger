import React, {Component} from 'react';
import {View, Text, NavigatorIOS} from 'react-native';

import Home from './routes/Home';
import Chat from './routes/Chat';

export default class Index extends Component {
  render() {
    let initialRoute = {
      title: 'Chat',
      component: Chat
    }

    return (
      <NavigatorIOS
        navigationBarHidden={false}
        tintColor='#FF6600'
        initialRoute={initialRoute}/>
    );
  }
}
