import {List, Map} from 'immutable';
import {expect} from 'chai';

import {shuffle, newDeck, deal, discard, capture} from '../src/core';

describe('application logic', () => {
    describe('suffle', () => {
        it('creates a deck of 40 cards', () => {
            const state = Map();
            const nextState = shuffle(state, newDeck());
            expect(nextState.get('deck').size).to.equal(40);
        });
    });

    describe('deal', () => {
        it('creats two player hands of three cards each', () => {
            const state = Map({
                deck: List.of('a', 'b', 'c', 'd', 'e', 'f', 'g',
                              'h', 'i', 'j', 'k')
            });

            const nextState = deal(state, 2);
            expect(nextState.getIn(['players', 0, 'hand']).size).to.equal(3);
            expect(nextState.getIn(['players',0,'hand']).size).to.equal(3);
            expect(nextState.get('table').size).to.equal(4);
            expect(nextState.get('deck').size).to.equal(1);
            expect(nextState).to.equal(Map({
                players: List.of(
                    Map({hand: List.of('a', 'c', 'e')}),
                    Map({hand: List.of('b', 'd', 'f')})),
                table: List.of('g', 'h', 'i', 'j'),
                deck: List.of('k')
            }));
        });
    });

    describe('discard', () => {
        it('places card on the table', () => {
            const state = Map({
                players: List.of(
                    Map({hand: List.of('a', 'c', 'e')}),
                    Map({hand: List.of('b', 'd', 'f')})),
                table: List.of('g', 'h', 'i', 'j'),
                deck: List.of('k')
            });
            const nextState = discard(state, 0, 1);
            expect(nextState).to.equal(Map({
                players: List.of(
                    Map({hand: List.of('a', 'e')}),
                    Map({hand: List.of('b', 'd', 'f')})),
                table: List.of('g', 'h', 'i', 'j', 'c'),
                deck: List.of('k')
            }));
        });
    });
    describe('capture', () => {
        it('captures one card', () => {
            const state = Map({
                players: List.of(
                    Map({hand: List.of('a', 'c', 'e')}),
                    Map({hand: List.of('b', 'd', 'f')})),
                table: List.of('g', 'h', 'i', 'j'),
                deck: List.of('k')
            });
            const nextState = capture(state, 0, 1, [2]);
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
        it('captures multiple cards', () => {
            const state = Map({
                players: List.of(
                    Map({hand: List.of('a', 'c', 'e')}),
                    Map({hand: List.of('b', 'd', 'f')})),
                table: List.of('g', 'h', 'i', 'j'),
                deck: List.of('k')
            });
            const nextState = capture(state, 0, 1, [1,2]);
            expect(nextState).to.equal(Map({
                players: List.of(
                    Map({hand: List.of('a', 'e'),
                        captured: List.of('c', 'h', 'i')
                    }),
                    Map({hand: List.of('b', 'd', 'f')})),
                table: List.of('g', 'j'),
                deck: List.of('k')
            }));
        });
    });
});
