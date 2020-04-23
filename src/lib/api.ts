import FBXAPI from '@feedbax/api';
import store from 'store';

FBXAPI.store = store;

const api = new FBXAPI('http://157.230.29.66:3000', 'user');
export default api;
