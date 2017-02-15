// @flow

import * as types from './actionTypes';
import type { User } from '../types';

type GetAuthenticatedUser = { type: 'GET_AUTHENTICATED_USER' };
type PutAuthenticatedUser = { type: 'PUT_AUTHENTICATED_USER', user: User };
type SetAuthenticatedUserFetchFailedErrorMessage = { type: 'SET_AUTHENTICATED_USER_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string | Object };

export type MainAction = GetAuthenticatedUser | PutAuthenticatedUser | SetAuthenticatedUserFetchFailedErrorMessage | any;

export const getAuthenticatedUser = (): GetAuthenticatedUser => ({ type: types.GET_AUTHENTICATED_USER });
export const putAuthenticatedUser = (user: User): PutAuthenticatedUser => ({ type: types.PUT_AUTHENTICATED_USER, user: user });
export const setAuthenticatedUserFetchFailedErrorMessage = (errorMessage: string | Object): SetAuthenticatedUserFetchFailedErrorMessage => ({
  type: types.SET_AUTHENTICATED_USER_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage
});
