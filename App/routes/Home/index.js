// @flow

import React, { Component } from 'react';
import { View, NavigatorIOS } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import UsersList from './UsersList';
import ChatsList from './ChatsList';
import FooterTabs from './FooterTabs';
import { getSortedChats } from '../../config/selectors';
import { getAuthenticatedUser } from '../../actions/mainActions';
import { fetchUsers, createChat, fetchChats } from '../../actions/homeActions';
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
    onCreateChat: (username: string) => void,
    onFetchChatsButtonPressed: () => void,
  }

  constructor(props) {
    super(props)
    props.onGetAuthenticatedUser();
    props.onFetchUsers();
    props.onFetchChats();
    this.state = {
      activeTab: 'chats',
    };
  }

  render() {
    return (
      <Container style={{ paddingTop: 66 }}>
        {this.state.activeTab === 'chats' ? (
          <ChatsList navigator={this.props.navigator} chats={this.props.chats} />
        ) : (
          <UsersList users={this.props.users} onCreateChat={this.props.onCreateChat} />
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
  chats: getSortedChats(state),
  chatsFetchFailedErrorMessage: state.home.chatsFetchFailedErrorMessage,
});

const mapDispatchToProps = {
  onGetAuthenticatedUser: getAuthenticatedUser,
  onFetchUsers: fetchUsers,
  onFetchChats: fetchChats,
  onCreateChat: createChat,
  onFetchChatsButtonPressed: fetchChats,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);
