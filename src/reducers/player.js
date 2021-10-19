const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  picture: '',
  token: '',
  players: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'INFO_PLAYER':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case 'GET_SCORE':
    return {
      ...state, score: action.payload.score,
    };
  case 'TOKEN_PLAYER':
    return {
      ...state, token: action.payload,
    };
  case 'GET_URL':
    return {
      ...state, picture: action.payload,
    };
  case 'RANKING_PLAYER':
    return {
      ...state,
      players: [...state.players,
        { ...action.payload }],
    };
  case 'ZERA_PLAYER':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      score: action.payload.score,
      picture: action.payload.picture,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default player;
