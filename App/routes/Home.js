import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Chat from './Chat';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  handleGoToChat() {
    this.props.navigator.push({
      title: 'Chat',
      component: Chat
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.link} onPress={this.handleGoToChat.bind(this)}>Go to the chat route</Text>
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
