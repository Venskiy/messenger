import React, {Component} from 'react';
import {StyleSheet, View, Text, NavigatorIOS} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducers';
import mySaga from './sagas';
import Home from './routes/Home';
import Chat from './routes/Chat';

const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

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
