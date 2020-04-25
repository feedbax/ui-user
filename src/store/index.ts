import createStore, { CreateRootReducer } from '@feedbax/api/dist/store/index';
import appReducer, { AppReducer } from './reducer';

const store = createStore<AppReducer>(appReducer);

export type RootStore = typeof store;

type RootReducer = CreateRootReducer<AppReducer>;
export type RootState = ReturnType<RootReducer>;

export default store;
