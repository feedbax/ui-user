import { createSelector } from 'reselect';
import { currentQuestionSelector } from '../current-question';

export const questionLikesSelector = createSelector(
  currentQuestionSelector,
  (question) => question.likes,
);
