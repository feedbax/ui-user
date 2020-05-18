import type { RootState } from 'store';
import type { AnswerFilter } from 'store/types';

export const currentAnswerFilterSelector = (
  (state: RootState): AnswerFilter => (
    state.app.answerFilter
  )
);
