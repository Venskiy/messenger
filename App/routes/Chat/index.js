import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Routes from '../../config/routes';
import * as types from '../../actions/actionTypes';
import MessageRow from './MessageRow';

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

class ChatRoute extends Component {
  constructor(props) {
    super(props)

    props.onFetchMessagesEvent(props.chatId);
  }

  render() {
    const chatMessages = this.props.messages[this.props.chatId];

    return chatMessages ? (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white' }}
          contentContainerStyle={{ alignItems: 'stretch' }}
        >
          <View style={{ height: 90 }} />
          {chatMessages.map((msg, idx) => (
            <MessageRow username={msg.sender_username} text={msg.text} key={idx} />
          ))}
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.link} onPress={() => this.props.navigator.pop()}>
          Go to the home route
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.chat.messages,
  messagesFetchFailedErrorMessage: state.chat.messagedFetchFailedErrorMessage
});

const mapDispatchToProps = (dispatch) => ({
  onFetchMessagesEvent(chatId) {
    dispatch({type: types.MESSAGES_FETCH_REQUESTED, payload: {chatId}});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoute);
