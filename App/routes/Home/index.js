// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import Tabs from 'react-native-tabs';
import { connect } from 'react-redux';

import UsersList from './UsersList';
import ChatsList from './ChatsList';
import { fetchUsers, fetchChats } from '../../actions/homeActions';
import type { User, ChatType } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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
    users: Array<User>,
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
    return (
      <View style={styles.container}>
        <Tabs
          selected={this.state.tab}
          style={{ backgroundColor: '#f7f7f7' }}
          selectedStyle={{ color: '#007ee5' }}
          onSelect={el => this.setState({ tab: el.props.name })}
        >
          <Text style={{ color: '#929292' }} name="chats">Chats</Text>
          <Text style={{ color: '#929292' }} name="users">Users</Text>
        </Tabs>
        {this.state.tab === 'chats' ? (
          <ChatsList navigator={this.props.navigator} chats={this.props.chats} />
        ) : (
          <UsersList users={this.props.users} />
        )}
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
