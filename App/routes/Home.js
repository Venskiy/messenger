import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {connect } from 'react-redux';

import Routes from '../config/routes';
import Chat from './Chat';
import * as types from '../actions/actionTypes';

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.chats);
    return (
      <View style={styles.container}>
        <Text style={styles.link} onPress={() => this.props.navigator.push(Routes.getChatRoute())}>
          Go to the chat route
        </Text>
        <Text onPress={this.props.onFetchChatsButtonPressed}>
          Fetch chats
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  chats: state.messenger.chats,
  chatsFetchFailedErrorMessage: state.messenger.chatsFetchFailedErrorMessage
});

const mapDispatchToProps = (dispatch) => ({
  onFetchChatsButtonPressed() {
    dispatch({type: types.CHATS_FETCH_REQUESTED, payload: {}});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
