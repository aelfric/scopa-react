import {SHUFFLE, NEW_DECK, DEAL_PLAYERS, DEAL_TABLE, DISCARD, CAPTURE} from '../src/actions.js';
import {Map, List, fromJS} from 'immutable';
import {shuffle, newDeck, dealPlayers, dealTable, discard, capture} from '../src/core';

export const INITIAL_STATE = Map();

export default function reducer(state=INITIAL_STATE, action){
    switch(action.type){
    case NEW_DECK:
        return newDeck(state);
    case SHUFFLE:
        return shuffle(state);
    case DEAL_PLAYERS:
        return dealPlayers(state, action.payload.numPlayers);
    case DEAL_TABLE:
        return dealTable(state);
    case DISCARD:
        return discard(state, 
                action.payload.player,
                action.payload.card);
    case CAPTURE:
        return capture(state,
                action.payload.player,
                action.payload.playedCard,
                action.payload.capturedCards);
    }
    return state;
}
