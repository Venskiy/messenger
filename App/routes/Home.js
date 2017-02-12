import React, { Component } from 'react';
import { ListView, StyleSheet, View, Text } from 'react-native';
import {connect } from 'react-redux';

import Routes from '../config/routes';
import Chat from './Chat';
import ChatRow from '../components/ChatRow';
import * as types from '../actions/actionTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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

class Home extends Component {
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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <ChatRow {...data} />}
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
  chats: state.messenger.chats,
  chatsFetchFailedErrorMessage: state.messenger.chatsFetchFailedErrorMessage
});

const mapDispatchToProps = (dispatch) => ({
  onFetchChatsButtonPressed() {
    dispatch({type: types.CHATS_FETCH_REQUESTED, payload: {}});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
