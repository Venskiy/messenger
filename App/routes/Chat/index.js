// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

import MessageRow from './MessageRow';
import Routes from '../../config/routes';
import { fetchChatMessages } from '../../actions/chatActions';
import type { User, Messages } from '../../types';

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
  props: {
    navigator: NavigatorIOS,
    chatId: number | string,
    authenticatedUser: User,
    messages: Messages,
    messagesFetchFailedErrorMessage: string | Object,
    onFetchMessagesEvent: (chatId: number | string) => void,
  }

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
            <MessageRow
              username={msg.sender_username}
              isOwn={this.props.authenticatedUser.username===msg.sender_username}
              text={msg.text}
              key={idx}
            />
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
  authenticatedUser: state.main.authenticatedUser,
  messages: state.chat.messages,
  messagesFetchFailedErrorMessage: state.chat.messagedFetchFailedErrorMessage
});

const mapDispatchToProps = {
  onFetchMessagesEvent: fetchChatMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoute);
