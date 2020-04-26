import {
  AppState,
  AnswerFilter,
  AppActionTypes,
  SET_CURRENT_QUESTION,
  SET_ANSWER_FILTER,
  PointerType,
  SET_POINTER_TYPE,
  SET_SELECTED_ANSWER,
} from './types';

const initialState: AppState = {
  currentQuestion: undefined,
  answerFilter: AnswerFilter.RECENT,
  pointerType: PointerType.TOUCH,
  selectedAnswer: null,
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

    case SET_POINTER_TYPE:
      return {
        ...state,
        pointerType: action.payload,
      };

    case SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload,
      };

    default:
      return state;
  }
};

export type AppReducer = typeof appReducer;
export default appReducer;
