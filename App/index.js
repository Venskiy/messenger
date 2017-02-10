import React, {Component} from 'react';
import {StyleSheet, View, Text, NavigatorIOS} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import Home from './routes/Home';
import Chat from './routes/Chat';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class Index extends Component {
  render() {
    let initialRoute = {
      title: 'Home',
      component: Home
    }

    return (
      <Provider store={store}>
        <NavigatorIOS
          navigationBarHidden={false}
          style={styles.container}
          tintColor='#FF6600'
          initialRoute={initialRoute}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
