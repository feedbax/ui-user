import store from 'store';
import { setCurrentQuestion } from 'store/actions';
import { createSelector } from 'reselect';
import { NoneQuestion } from '@feedbax/backend-api/store/modules/questions/types';

import type { RootState } from 'store';
import type { QuestionsState } from '@feedbax/backend-api/store/modules/questions/types';
import type { CurrentQuestion } from 'store/types';

export const currentQuestionSelector = (
  createSelector<RootState, QuestionsState, number, CurrentQuestion>(
    (state) => state.api.questions,
    (state) => state.app.currentQuestionNumber || 0,
    (questions, currentQuestion) => {
      const questionsOrdered = Object.values(questions).sort((a, b) => a.order - b.order);

      if (questionsOrdered.length === 0) {
        return NoneQuestion;
      }

      if (!questionsOrdered[currentQuestion]) {
        const action = setCurrentQuestion(0);
        store.dispatch(action);

        return NoneQuestion;
      }

      return questionsOrdered[currentQuestion];
    },
  )
);
