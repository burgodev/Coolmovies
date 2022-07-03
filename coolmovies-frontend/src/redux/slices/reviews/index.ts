export { actions as reviewsActions } from './slice';
export { default as reviewsReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { fetch, update, create } from './epics';

export const reviewsEpics = combineEpics(fetch, update, create);
