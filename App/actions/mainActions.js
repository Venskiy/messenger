// @flow

import * as types from './actionTypes';
import type { User } from '../types';

type ObtainAccessToken = { type: 'OBTAIN_ACCESS_TOKEN', username: string, password: string };
type AccessTokenFetchRequested = { type: 'ACCESS_TOKEN_FETCH_REQUESTED' };
type SetAccessTokenFetchFailedErrorMessage = { type: 'SET_ACCESS_TOKEN_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string };
type PutAccessToken = { type: 'PUT_ACCESS_TOKEN', accessToken: string };
type GetAuthenticatedUser = { type: 'GET_AUTHENTICATED_USER' };
type PutAuthenticatedUser = { type: 'PUT_AUTHENTICATED_USER', user: User };
type SetAuthenticatedUserFetchFailedErrorMessage = { type: 'SET_AUTHENTICATED_USER_FETCH_FAILED_ERROR_MESSAGE', errorMessage: string | Object };

export type MainAction = ObtainAccessToken | AccessTokenFetchRequested |
  SetAccessTokenFetchFailedErrorMessage | PutAccessToken | GetAuthenticatedUser |
  PutAuthenticatedUser | SetAuthenticatedUserFetchFailedErrorMessage | any;

export const obtainAccessToken = (username: string, password: string): ObtainAccessToken => ({
  type: types.OBTAIN_ACCESS_TOKEN,
  username: username,
  password: password,
});
export const accessTokenFetchRequested = (): AccessTokenFetchRequested => ({ type: types.ACCESS_TOKEN_FETCH_REQUESTED });
export const setAccessTokenFetchFailedErrorMessage = (errorMessage: string): SetAccessTokenFetchFailedErrorMessage => ({
  type: types.SET_ACCESS_TOKEN_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage,
});
export const putAccessToken = (accessToken: string): PutAccessToken => ({ type: types.PUT_ACCESS_TOKEN, accessToken: accessToken });
export const getAuthenticatedUser = (): GetAuthenticatedUser => ({ type: types.GET_AUTHENTICATED_USER });
export const putAuthenticatedUser = (user: User): PutAuthenticatedUser => ({ type: types.PUT_AUTHENTICATED_USER, user: user });
export const setAuthenticatedUserFetchFailedErrorMessage = (errorMessage: string | Object): SetAuthenticatedUserFetchFailedErrorMessage => ({
  type: types.SET_AUTHENTICATED_USER_FETCH_FAILED_ERROR_MESSAGE,
  errorMessage: errorMessage
});
