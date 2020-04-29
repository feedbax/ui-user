import FBXAPI, { FBXAPIUser, FBXAPIAdmin } from '@feedbax/api';
import store from 'store';
import history from './history';

const adminApi = FBXAPI.create(FBXAPIAdmin, 'https://test.feedb.ax:8080');
(window as any).adminApi = adminApi;

FBXAPI.store = store;
const api = FBXAPI.create(FBXAPIUser, 'https://test.feedb.ax:8080');

api.onDisconnect(() => {
  const { api: _api } = store.getState();
  const { event } = _api;
  const { slug } = event;

  history.push(`/login`, { eventCode: slug });
});

export default api;
