import { apiReducer, addDispatchAll } from '@feedbax/api/store/index';
import { createStore, combineReducers } from 'redux';

import appReducer from './reducer';

const rootReducer = combineReducers({
  api: apiReducer,
  app: appReducer,
});

const _store = createStore(rootReducer);
const store = addDispatchAll(_store);

export type RootStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
