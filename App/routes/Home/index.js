// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import Tabs from 'react-native-tabs';
import { connect } from 'react-redux';

import ChatsList from './ChatsList';
import { fetchUsers, fetchChats } from '../../actions/homeActions';
import type { ChatType } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

class HomeRoute extends Component {
  state: {
    tab: string,
  }

  props: {
    navigator: NavigatorIOS,
    chats: Array<ChatType>,
    chatsFetchFailedErrorMessage: string | Object,
    onFetchChatsButtonPressed: () => void,
  }

  constructor(props) {
    super(props)

    this.state = {
      tab: 'chats',
    };
  }

  render() {
    console.log(this.props.users);
    return (
      <View style={styles.container}>
        <Tabs
          selected={this.state.tab}
          style={{backgroundColor:'white'}}
          selectedStyle={{color:'red'}}
          onSelect={el => this.setState({ tab: el.props.name })}
        >
          <Text name="chats">Chats</Text>
          <Text name="users">Users</Text>
        </Tabs>
        <ChatsList navigator={this.props.navigator} chats={this.props.chats} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.home.users,
  usersFetchFailedErrorMessage: state.home.usersFetchFailedErrorMessage,
  chats: state.home.chats,
  chatsFetchFailedErrorMessage: state.home.chatsFetchFailedErrorMessage,
});

const mapDispatchToProps = {
  onFetchChatsButtonPressed: fetchChats,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);
