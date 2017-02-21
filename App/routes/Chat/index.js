// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

import ChatMessages from './ChatMessages';
import Toolbar from './Toolbar';
import { SOCKET_ROOT, TOKEN } from '../../config/settings';
import Routes from '../../config/routes';
import { fetchChatMessages } from '../../actions/chatActions';
import type { User, ChatType, Messages } from '../../types';
import * as constants from '../../utils/constants';

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
  state: {
    ws: WebSocket,
    text: string
  }

  props: {
    navigator: NavigatorIOS,
    chat: ChatType,
    authenticatedUser: User,
    messages: Messages,
    messagesFetchFailedErrorMessage: string | Object,
    onFetchMessagesEvent: (chatId: number | string) => void,
  }

  constructor(props) {
    super(props)

    this.state = {
      ws: new WebSocket(`${SOCKET_ROOT}tornado_chat/${props.chat.id}/?user_token=${TOKEN}`),
      text: '',
    };

    props.onFetchMessagesEvent(props.chat.id);
  }

  sendMessage() {
    if(this.state.text.replace(/\s+/g, '') !== '') {
      const message = {
        type: constants.SEND_MESSAGE,
        interlocutorId: this.props.chat.interlocutor_id,
        message: this.state.text
      }

      this.state.ws.send(JSON.stringify(message));
      this.setState({ text: '' });
    }
  }

  render() {
    const chatMessages = this.props.messages[this.props.chat.id];
    return chatMessages ? (
      <View style={{ flex: 1, paddingTop: 66 }}>
        <ChatMessages
          authenticatedUser={this.props.authenticatedUser}
          chatMessages={chatMessages}
        />
        <Toolbar
          text={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          onSendMessage={this.sendMessage.bind(this)}
        />
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
