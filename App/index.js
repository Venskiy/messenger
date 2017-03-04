// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

import Loading from './components/Loading';
import { accessTokenFetchRequested } from './actions/mainActions';
import {
  fetchUsers,
  addNewChat,
  fetchChats,
  updateChatLastMessage,
  readChatLastMessage,
  changeIsTypingState,
} from './actions/homeActions';
import { recieveChatMessage, readChatMessages } from './actions/chatActions';
import type { FullState } from './reducers/mainReducer';
import type { User, Message, Messages } from './types';
import routes from './config/routes';
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
    accessToken: string,
    accessTokenFetchFailedErrorMessage: string,
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
    props.onFetchAccessToken();
    props.onFetchUsers();
    props.onFetchChats();
  }

  componentWillUpdate(nextProps: any) {
    this.state.ws.onmessage = function(e: any) {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case constants.SEND_MESSAGE:
          if(nextProps.messages[data.chat_id]) {
            nextProps.onRecieveChatMessage(data.chat_id, data.message);
          }
          nextProps.onUpdateChatLastMessage(data.chat_id, data.sender_id, data.message);
          break;
        case constants.READ_MESSAGE:
          nextProps.onReadChatLastMessage(data.chat_id);
          nextProps.onReadChatMessages(data.chat_id);
          break;
        case constants.IS_USER_TYPING:
          nextProps.onInterlocutorTyping(data.chat_id);
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
    if (this.props.accessToken) {
      return (
        <NavigatorIOS
          navigationBarHidden={false}
          style={styles.container}
          tintColor='#FF6600'
          initialRoute={routes.getHomeRoute()}
        />
      );
    } else {
      if (this.props.accessTokenFetchFailedErrorMessage) {
        return (
          <NavigatorIOS
            navigationBarHidden={false}
            style={styles.container}
            tintColor='#FF6600'
            initialRoute={routes.getLoginRoute()}
          />
        );
      } else {
        return <Loading />
      }
    }
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.main.accessToken,
  accessTokenFetchFailedErrorMessage: state.main.accessTokenFetchFailedErrorMessage,
  user: state.main.authenticatedUser,
  messages: state.chat.messages,
});

const mapDispatchToProps = {
  onFetchAccessToken: accessTokenFetchRequested,
  onFetchUsers: fetchUsers,
  onAddNewChat: addNewChat,
  onFetchChats: fetchChats,
  onRecieveChatMessage: recieveChatMessage,
  onUpdateChatLastMessage: updateChatLastMessage,
  onReadChatLastMessage: readChatLastMessage,
  onReadChatMessages: readChatMessages,
  onInterlocutorTyping: changeIsTypingState,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
