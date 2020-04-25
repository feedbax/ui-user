import FBXAPI, { FBXAPIUser } from '@feedbax/api';
import store from 'store';

FBXAPI.store = store;

const api = FBXAPI.create(FBXAPIUser, 'http://157.230.29.66:3000');
export default api;
