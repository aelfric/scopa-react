import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import {SHUFFLE, NEW_DECK, DEAL_PLAYERS, DEAL_TABLE, DISCARD, CAPTURE} from '../src/actions.js';
describe('reducer', () => {
    it('has an initial state', () => {
        const action = {type: NEW_DECK};
        const state = reducer(undefined, action);
        expect(state.get('deck').size).to.equal(40);
    });
    it('handles NEW_DECK and SUFFLE', () => {
        const initialState = Map();
        const newDeck = {type: NEW_DECK};
        const shuffle = {type: SHUFFLE};
        const nextState = reducer(initialState, newDeck);
        expect(nextState.get('deck').size).to.equal(40);
        const thirdState = reducer(nextState, shuffle);
        expect(thirdState.get('deck').size).to.equal(40);
    });

    it('handles DEAL_PLAYERS', () => {
        const state = Map({
            deck: List.of('a', 'b', 'c', 'd', 'e', 'f', 'g',
                          'h', 'i', 'j', 'k')
        });
        const action = {type: DEAL_PLAYERS, payload: {numPlayers: 2}};
        const nextState = reducer(state, action);
        expect(nextState.getIn(['players', 0, 'hand']).size).to.equal(3);
        expect(nextState.getIn(['players',0,'hand']).size).to.equal(3);
    });

    it('handles DEAL_TABLE', () => {
        const state = Map({
            deck: List.of('a', 'b', 'c', 'd', 'g',
                          'h', 'i', 'j', 'k')
        });

        const action = {type: DEAL_TABLE};
        const nextState = reducer(state, action);
        expect(nextState.get('deck').size).to.equal(5);
        expect(nextState.get('table').size).to.equal(4);
    });

    it('handles DISCARD', () => {
        const state = Map({
            players: List.of(
                             Map({hand: List.of('a', 'c', 'e')}),
                             Map({hand: List.of('b', 'd', 'f')})),
            table: List.of('g', 'h', 'i', 'j'),
            deck: List.of('k')
        });
        const action = {type: DISCARD, payload: {player: 0, card: 1}};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            players: List.of(
                             Map({hand: List.of('a', 'e')}),
                             Map({hand: List.of('b', 'd', 'f')})),
            table: List.of('g', 'h', 'i', 'j', 'c'),
            deck: List.of('k')
        }));
    });

    it('handles CAPTURE', () => {
        const state = Map({
            players: List.of(
                             Map({hand: List.of('a', 'c', 'e')}),
                             Map({hand: List.of('b', 'd', 'f')})),
            table: List.of('g', 'h', 'i', 'j'),
            deck: List.of('k')
        });
        const action = {type: CAPTURE, 
            payload: {
                player: 0,
                playedCard: 1,
                capturedCards: [2]
            }
        }
        const nextState = reducer(state, action);
        expect(nextState).to.equal(Map({
            players: List.of(
                             Map({hand: List.of('a', 'e'),
                                 captured: List.of('c', 'i')
                             }),
                             Map({hand: List.of('b', 'd', 'f')})),
            table: List.of('g', 'h', 'j'),
            deck: List.of('k')
        }));
    });
});
