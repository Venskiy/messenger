// @flow

import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';

import Chat from '../Chat';
import ChatRow from './ChatRow';
import Routes from '../../config/routes';
import { fetchChats } from '../../actions/homeActions';
import type { ChatType } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  link: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class HomeRoute extends Component {
  state: {
    dataSource: ListView
  }

  props: {
    navigator: NavigatorIOS,
    chats: Array<ChatType>,
    chatsFetchFailedErrorMessage: string | Object,
    onFetchChatsButtonPressed: () => void
  }

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.chats),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chats !== this.props.chats) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.chats)
      });
    }
  }

  onSelectChat(chatId) {
    this.props.navigator.push(Routes.getChatRoute(chatId));
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(chat) => <ChatRow chat={chat} onSelectChat={this.onSelectChat.bind(this)} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
      // <View style={styles.container}>
      //   <Text style={styles.link} onPress={() => this.props.navigator.push(Routes.getChatRoute())}>
      //     Go to the chat route
      //   </Text>
      //   <Text onPress={this.props.onFetchChatsButtonPressed}>
      //     Fetch chats
      //   </Text>
      // </View>
    );
  }
}

const mapStateToProps = (state) => ({
  chats: state.home.chats,
  chatsFetchFailedErrorMessage: state.home.chatsFetchFailedErrorMessage
});

const mapDispatchToProps = {
  onFetchChatsButtonPressed: fetchChats,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);
