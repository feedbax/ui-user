import { createSelector } from 'reselect';
import { questionLikesSelector } from '../current-question-likes';

export const questionLikesLengthSelector = createSelector(
  questionLikesSelector,
  (likes) => likes.length,
);
