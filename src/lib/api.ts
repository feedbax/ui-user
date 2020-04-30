import FBXAPI, { FBXAPIUser, FBXAPIAdmin } from '@feedbax/api';
import store from 'store';
import history from './history';

const apiUrl = process.env.REACT_APP_WS_SERVER_URL || '';
const adminApi = FBXAPI.create(FBXAPIAdmin, apiUrl);
(window as any).adminApi = adminApi;

FBXAPI.store = store;
const api = FBXAPI.create(FBXAPIUser, apiUrl);

api.onDisconnect(() => {
  const { api: _api } = store.getState();
  const { event } = _api;
  const { slug } = event;

  api.logout();
  history.push(`/login`, { eventCode: slug });
});

export default api;
