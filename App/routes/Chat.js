import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props)
  }

  handleGoToHome() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.link} onPress={this.handleGoToHome.bind(this)}>Go to the home route</Text>
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
