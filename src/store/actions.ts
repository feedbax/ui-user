import store from 'store';

import {
  SetCurrentQuestionAction,
  SET_CURRENT_QUESTION,
  AnswerFilter,
  SetAnswerFilterAction,
  SET_ANSWER_FILTER,
} from './types';

export const setCurrentQuestion = (questionNumber: number): SetCurrentQuestionAction => {
  const { api } = store.getState();
  const { questions } = api;

  const ordered = Object.values(questions).sort((a, b) => a.order - b.order);
  const question = ordered[questionNumber];

  return {
    type: SET_CURRENT_QUESTION,
    payload: question,
  };
};

export const setAnswerFilter = (filter: AnswerFilter): SetAnswerFilterAction => ({
  type: SET_ANSWER_FILTER,
  payload: filter,
});
