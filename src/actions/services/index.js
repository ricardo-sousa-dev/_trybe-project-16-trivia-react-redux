/* API - Token */

const requestApi = () => ({
  type: 'REQUEST_PLAYER', status: 'Loading',
});
const requestError = () => ({
  type: 'REQUEST_ERROR', status: 'Fail',
});
const receiveToken = (payload) => ({
  type: 'TOKEN_PLAYER', payload,
});

export default function apiTOKEN() {
  return async (dispatch) => {
    try {
      dispatch(requestApi());
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      localStorage.setItem('token', JSON.stringify(token.token));
      return dispatch(receiveToken(token.token));
    } catch (error) {
      return dispatch(requestError());
    }
  };
}

/* API - Questions */

const questionsApi = () => ({
  type: 'QUESTIONS_LOADING', status: 'Loading',
});

const questionsApiOk = (payload) => ({
  type: 'QUESTIONS_OK', payload,
});

const questionsApiError = (error) => ({
  type: 'QUESTIONS_ERROR', status: error,
});

export function apiQUESTIONS(configs) {
  return async (dispatch) => {
    try {
      dispatch(questionsApi());
      const response = await fetch(`https://opentdb.com/api.php?amount=5${configs}`);
      const questions = await response.json();
      return dispatch(questionsApiOk(questions.results));
    } catch (error) {
      return dispatch(questionsApiError(error));
    }
  };
}
