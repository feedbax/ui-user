import {
  AppState,
  AnswerFilter,
  AppActionTypes,
  SET_CURRENT_QUESTION,
  SET_ANSWER_FILTER,
} from './types';

const initialState: AppState = {
  currentQuestion: undefined,
  answerFilter: AnswerFilter.RECENT,
};

const appReducer = (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };

    case SET_ANSWER_FILTER:
      return {
        ...state,
        answerFilter: action.payload,
      };

    default:
      return state;
  }
};

export type AppReducer = typeof appReducer;
export default appReducer;
