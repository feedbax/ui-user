import store from 'store';

import * as types from './types';

const { SET_CURRENT_QUESTION, SET_ANSWER_FILTER, SET_POINTER_TYPE } = types;

type SetCurrentQuestionAction = import('./types').SetCurrentQuestionAction;
type SetAnswerFilterAction = import('./types').SetAnswerFilterAction;
type SetPointerTypeAction = import('./types').SetPointerTypeAction;

type AnswerFilter = import('./types').AnswerFilter;
type PointerType = import('./types').PointerType;

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

export const setPointerType = (pointer: PointerType): SetPointerTypeAction => ({
  type: SET_POINTER_TYPE,
  payload: pointer,
});
