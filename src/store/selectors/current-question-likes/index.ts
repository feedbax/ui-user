import { createSelector } from 'reselect';
import { createQuestionsSelector } from '../questions';

import type { RootState } from 'store';

const stripPropsOrderAndLikes = ['answers', 'id', 'eventId', 'text', 'type', 'settings'] as const;
const questionsOrderAndLikes = createQuestionsSelector(...stripPropsOrderAndLikes);
type QuestionsOrderAndLikes = ReturnType<typeof questionsOrderAndLikes>;

export const questionLikesSelector = (
  createSelector<RootState, QuestionsOrderAndLikes, number, string[]>(
    questionsOrderAndLikes,
    (state) => state.app.currentQuestionNumber || 0,
    (questions, currentQuestion) => {
      if (questions.length >= 1) {
        return questions[currentQuestion]?.likes || [];
      }

      return [];
    },
  )
);
