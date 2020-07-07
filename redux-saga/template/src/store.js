import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
};
const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware()

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeSetup(applyMiddleware(sagaMiddleware))

const store = createStore(
  pReducer,
  enhancer,
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {persistor, store};