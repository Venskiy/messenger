import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Routes from '../../config/routes';
import Chat from '../Chat';
import ChatRow from './ChatRow';
import * as types from '../../actions/actionTypes';

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

const mapDispatchToProps = (dispatch) => ({
  onFetchChatsButtonPressed() {
    dispatch({type: types.CHATS_FETCH_REQUESTED, payload: {}});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);
