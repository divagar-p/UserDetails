import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './slice/LoginSlice';
import userReducer from './slice/UserSlice';
// slices

export const rootPersistConfig = {
	key: 'root',
	storage,
	keyPrefix: 'redux-',
	whitelist: [],
};

const loginPersistConfig = {
	key: 'login',
	storage,
	keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
	login: persistReducer(loginPersistConfig, loginReducer),
	user: userReducer
});

export default rootReducer;
