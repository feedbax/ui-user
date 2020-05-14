import { create, FBXAPI } from '@feedbax/backend-api';
import store from 'store';
import history from './history';

const apiUrl = process.env.REACT_APP_WS_SERVER_URL || '';
const adminApi = create(apiUrl, 'admin');
(window as any).adminApi = adminApi;

FBXAPI.store = store;
const api = create(apiUrl, 'user');

api.on('disconnect', () => {
  const { api: _api } = store.getState();
  const { event } = _api;
  const { slug } = event;

  api.logout();
  history.push(`/login`, { eventCode: slug });
});

export default api;
