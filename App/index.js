import React, {Component} from 'react';
import {StyleSheet, View, Text, NavigatorIOS} from 'react-native';

import Home from './routes/Home';
import Chat from './routes/Chat';

export default class Index extends Component {
  render() {
    let initialRoute = {
      title: 'Home',
      component: Home
    }

    return (
      <NavigatorIOS
        navigationBarHidden={false}
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={initialRoute}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
