import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';
import {SHUFFLE, NEW_DECK} from '../src/actions.js';

describe('store', () => {

    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({type: NEW_DECK});
        expect(store.getState().get('deck').size).to.equal(40);

        store.dispatch({type: SHUFFLE});
        expect(store.getState().get('deck').size).to.equal(40);
    });
});
