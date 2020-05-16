import * as types from './types';

const { SET_CURRENT_QUESTION, SET_ANSWER_FILTER, SET_POINTER_TYPE, SET_SELECTED_ANSWER } = types;

type SetCurrentQuestionAction = import('./types').SetCurrentQuestionAction;
type SetAnswerFilterAction = import('./types').SetAnswerFilterAction;
type SetPointerTypeAction = import('./types').SetPointerTypeAction;
type SetSelectedAnswerAction = import('./types').SetSelectedAnswerAction;

type AnswerFilter = import('./types').AnswerFilter;
type PointerType = import('./types').PointerType;

export const setCurrentQuestion = (questionNumber: number): SetCurrentQuestionAction => ({
  type: SET_CURRENT_QUESTION,
  payload: questionNumber,
});

export const setAnswerFilter = (filter: AnswerFilter): SetAnswerFilterAction => ({
  type: SET_ANSWER_FILTER,
  payload: filter,
});

export const setPointerType = (pointer: PointerType): SetPointerTypeAction => ({
  type: SET_POINTER_TYPE,
  payload: pointer,
});

export const setSeletedAnswer = (answerId: string | null): SetSelectedAnswerAction => ({
  type: SET_SELECTED_ANSWER,
  payload: answerId,
});
