// @flow

import React, { Component } from 'react';
import { View, NavigatorIOS } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import UsersList from './UsersList';
import ChatsList from './ChatsList';
import FooterTabs from './FooterTabs';
import { fetchUsers, fetchChats } from '../../actions/homeActions';
import type { User, ChatType } from '../../types';

class HomeRoute extends Component {
  state: {
    activeTab: string,
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
      activeTab: 'chats',
    };
  }

  render() {
    return (
      <Container>
        {this.state.activeTab === 'chats' ? (
          <ChatsList navigator={this.props.navigator} chats={this.props.chats} />
        ) : (
          <UsersList users={this.props.users} />
        )}
        <FooterTabs
          activeTab={this.state.activeTab}
          onSelectTab={(tab) => this.setState({ activeTab: tab })}
        />
      </Container>
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
