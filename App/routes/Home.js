import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Routes from '../config/routes';
import Chat from './Chat';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.link} onPress={() => this.props.navigator.push(Routes.getChatRoute())}>
          Go to the chat route
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  link: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
