import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Routes from '../config/routes';
import * as types from '../actions/actionTypes';

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

class Chat extends Component {
  constructor(props) {
    super(props)

    props.onFetchMessagesEvent(props.chatId);
  }

  render() {
    console.log(this.props.messages);
    return (
      <View style={styles.container}>
        <Text style={styles.link} onPress={() => this.props.navigator.pop()}>
          Go to the home route
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messenger.messages,
  messagesFetchFailedErrorMessage: state.messenger.messagedFetchFailedErrorMessage
});

const mapDispatchToProps = (dispatch) => ({
  onFetchMessagesEvent(chatId) {
    dispatch({type: types.MESSAGES_FETCH_REQUESTED, payload: {chatId}});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
