/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 'use strict';

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import { homeReducer } from './App/reducers/homeReducer';
import { chatReducer } from './App/reducers/chatReducer';
import { mainReducer } from './App/reducers/mainReducer';
import mySaga from './App/sagas';

const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({ main: mainReducer, home: homeReducer, chat: chatReducer });
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('messenger', () => Index);
