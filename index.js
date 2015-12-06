import makeStore from './src/store';
import startServer from './src/server';
import {SHUFFLE, NEW_DECK} from './src/actions.js';

export const store = makeStore();
startServer(store);

store.dispatch({type: NEW_DECK});
store.dispatch({type: SHUFFLE});
