// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

import Home from './routes/Home';
import Chat from './routes/Chat';
import { fetchUsers, addNewChat, fetchChats, updateChatLastMessage, readChatLastMessage } from './actions/homeActions';
import { recieveChatMessage } from './actions/chatActions';
import type { FullState } from './reducers/mainReducer';
import type { User, Message, Messages } from './types';
import { SOCKET_ROOT, TOKEN } from './config/settings';
import * as constants from './utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Index extends Component {
  state: {
    ws: WebSocket
  }

  props: {
    user: User,
    messages: Messages,
    onFetchChats: () => void,
    onRecieveChatMessage: (chatId: number | string, message: Message) => void
  }

  constructor(props) {
    super(props)
    this.state = {
      ws: new WebSocket(`${SOCKET_ROOT}chat_app/${props.user.id}/?user_token=${TOKEN}`)
    };
    props.onFetchUsers();
    props.onFetchChats();
  }

  componentWillUpdate(nextProps: any) {
    this.state.ws.onmessage = function(e: any) {
      const data = JSON.parse(e.data);
      console.log(data);
      switch (data.type) {
        case constants.SEND_MESSAGE:
          if(nextProps.messages[data.chat_id]) {
            nextProps.onRecieveChatMessage(data.chat_id, data.message);
          }
          nextProps.onUpdateChatLastMessage(data.chat_id, data.sender_id, data.message);
          break;
        case constants.READ_MESSAGE:
          nextProps.onReadChatLastMessage(data.chat_id);
          break;
        case constants.DISPLAY_CHAT_ON_RECIPIENT_SIDE:
          nextProps.onAddNewChat(data.chat);
          break;
        default:
          break;
      }
    };
  }

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
        initialRoute={initialRoute}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.main.authenticatedUser,
  messages: state.chat.messages,
});

const mapDispatchToProps = {
  onFetchUsers: fetchUsers,
  onAddNewChat: addNewChat,
  onFetchChats: fetchChats,
  onRecieveChatMessage: recieveChatMessage,
  onUpdateChatLastMessage: updateChatLastMessage,
  onReadChatLastMessage: readChatLastMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
