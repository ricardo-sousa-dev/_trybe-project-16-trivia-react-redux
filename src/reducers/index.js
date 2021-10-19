import { combineReducers } from 'redux';
import player from './player';
import game from './game';
import config from './config';

const rootReducer = combineReducers({ player, game, config });

export default rootReducer;
