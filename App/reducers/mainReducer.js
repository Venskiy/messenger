// @flow

import * as types from '../actions/actionTypes';
import type { MainAction } from '../actions/mainActions';
import type { User } from  '../types';
import type { ChatState } from './chatReducer';
import type { HomeState } from './homeReducer';

const initialState: MainState = {
  accessToken: '',
  accessTokenFetchFailedErrorMessage: '',
  authenticatedUser: { id: 4, username: 'Venskiy' },
  authenticatedUserFetchFailedErrorMessage: '',
}

type MainState = {
  accessToken: string,
  authenticatedUser: User,
  authenticatedUserFetchFailedErrorMessage: string | Object,
}

export type FullState = MainState | ChatState | HomeState;

export const mainReducer = (state: MainState = initialState, action: MainAction | any = {}): MainState => {
  switch (action.type) {
    case types.PUT_ACCESS_TOKEN:
      return { ...state, accessToken: action.accessToken };
    case types.SET_ACCESS_TOKEN_FETCH_FAILED_ERROR_MESSAGE:
      return { ...state, accessTokenFetchFailedErrorMessage: action.errorMessage };
    case types.PUT_AUTHENTICATED_USER:
      return { ...state, authenticatedUser: action.user };
    case types.SET_AUTHENTICATED_USER_FETCH_FAILED_ERROR_MESSAGE:
      return { ...state, authenticatedUserFetchFailedErrorMessage: action.errorMessage };
    default:
      return state;
  }
}
