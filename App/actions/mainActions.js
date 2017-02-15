// @flow

import * as types from './actionTypes';
import type { ChatType } from '../types';

type GetAuthenticatedUser = { type: 'GET_AUTHENTICATED_USER' };

export type MainAction = GetAuthenticatedUser | any;

export const getAuthenticatedUser = (): GetAuthenticatedUser => ({ type: types.GET_AUTHENTICATED_USER });
