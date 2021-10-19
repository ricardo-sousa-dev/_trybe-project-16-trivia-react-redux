const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const config = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CONFIG_GAME':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default config;
