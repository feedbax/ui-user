import {
  SET_CURRENT_QUESTION,
  SET_ANSWER_FILTER,
  SET_POINTER_TYPE,
  SET_SELECTED_ANSWER,
} from 'store/types';

import type {
  SetCurrentQuestionAction,
  SetAnswerFilterAction,
  SetPointerTypeAction,
  SetSelectedAnswerAction,
} from 'store/types';

import type { AnswerFilter, PointerType } from 'store/types';

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
