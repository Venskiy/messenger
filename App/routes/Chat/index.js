// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import ChatMessages from './ChatMessages';
import Toolbar from './Toolbar';
import { SOCKET_ROOT, TOKEN } from '../../config/settings';
import { getChatById } from '../../config/selectors';
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
    text: string,
    isTyping: boolean,
    timeout?: number,
  }

  props: {
    navigator: NavigatorIOS,
    chatId: number | string,
    chat: ChatType,
    authenticatedUser: User,
    messages: Messages,
    messagesFetchFailedErrorMessage: string | Object,
    onFetchMessagesEvent: (chatId: number | string) => void,
  }

  constructor(props) {
    super(props)

    this.state = {
      ws: new WebSocket(`${SOCKET_ROOT}tornado_chat/${props.chatId}/?user_token=${TOKEN}`),
      text: '',
      isTyping: false,
    };

    props.onFetchMessagesEvent(props.chatId);
  }

  componentDidUpdate(prevProps) {
    const chat = this.props.chat;
    if (!chat.last_message_is_read && chat.last_message_sender_id.toString() === chat.interlocutor_id.toString()) {
      this.state.ws.send(JSON.stringify({
        type: constants.READ_MESSAGE,
        interlocutorId: chat.interlocutor_id,
      }));
    }
  }

  componentWillUnmount() {
    if (this.state.isTyping) {
      clearTimeout(this.state.timeout);
      this.setState({ isTyping: false });
      this.state.ws.send(JSON.stringify({
        type: constants.IS_USER_TYPING,
        interlocutorId: this.props.chat.interlocutor_id,
      }));
    }
  }

  sendMessage() {
    if (this.state.text.replace(/\s+/g, '') !== '') {
      const message = {
        type: constants.SEND_MESSAGE,
        interlocutorId: this.props.chat.interlocutor_id,
        message: this.state.text
      }

      this.state.ws.send(JSON.stringify(message));
      this.setState({ text: '' });
    }
  }

  handleChangeText(text) {
    this.setState({ text });

    clearTimeout(this.state.timeout);
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.state.ws.send(JSON.stringify({
        type: constants.IS_USER_TYPING,
        interlocutorId: this.props.chat.interlocutor_id,
      }));
    }
    let _this = this;
    const timeout =  setTimeout(function() {
      _this.setState({ isTyping: false });
      _this.state.ws.send(JSON.stringify({
        type: constants.IS_USER_TYPING,
        interlocutorId: _this.props.chat.interlocutor_id,
      }));
    }, 3000);
    this.setState({ timeout: timeout });
  }

  render() {
    const chatMessages = this.props.messages[this.props.chatId];
    return chatMessages ? (
      <View style={{ flex: 1, paddingTop: 66 }}>
        <ChatMessages
          authenticatedUser={this.props.authenticatedUser}
          chatMessages={chatMessages}
        />
        <Toolbar
          text={this.state.text}
          onChangeText={this.handleChangeText.bind(this)}
          onSendMessage={this.sendMessage.bind(this)}
        />
        <KeyboardSpacer />
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

const mapStateToProps = (state, ownProps) => ({
  chat: getChatById(state, ownProps.chatId),
  authenticatedUser: state.main.authenticatedUser,
  messages: state.chat.messages,
  messagesFetchFailedErrorMessage: state.chat.messagedFetchFailedErrorMessage
});

const mapDispatchToProps = {
  onFetchMessagesEvent: fetchChatMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoute);
