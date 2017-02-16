// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

import Home from './routes/Home';
import Chat from './routes/Chat';
import { fetchChats } from './actions/homeActions';
import { recieveChatMessage } from './actions/chatActions';
import type { User, Message, Messages } from './types';
import { SOCKET_ROOT, TOKEN } from './config/settings';

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
    props.onFetchChats();

    this.state = {
      ws: new WebSocket(`${SOCKET_ROOT}chat_app/${props.user.id}/?user_token=${TOKEN}`)
    };
    this.state.ws.onmessage = function(e) {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'SEND_MESSAGE':
          if(props.messages[data.chat_id]) {
            props.onRecieveChatMessage(data.chat_id, data.message);
          }
          break;
        default:
          break;
      }
    };
  }

  componentWillUpdate(nextProps) {
    this.state.ws.onmessage = function(e) {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'SEND_MESSAGE':
          if(nextProps.messages[data.chat_id]) {
            nextProps.onRecieveChatMessage(data.chat_id, data.message);
          }
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
  onFetchChats: fetchChats,
  onRecieveChatMessage: recieveChatMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
