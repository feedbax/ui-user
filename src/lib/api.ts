import FBXAPI, { FBXAPIUser } from '@feedbax/api';
import store from 'store';
import history from './history';

FBXAPI.store = store;

const api = FBXAPI.create(FBXAPIUser, 'http://157.230.29.66:3000');

api.onDisconnect(() => {
  const { api: _api } = store.getState();
  const { event } = _api;
  const { slug } = event;

  history.push(`/login`, { eventCode: slug });
});

export default api;
