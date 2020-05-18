import { createSelector } from 'reselect';

import type { QuestionsOutput, QuestionStrip } from './types';
import type { RootState } from 'store';
import type { QuestionsState } from '@feedbax/backend-api/store/modules/questions/types';


const selectorCache = new Map<string, any>();

export const createQuestionsSelector = (
  <T extends string>(...stripProps: T[]): QuestionsOutput<T> => {
    const sortedStripProps = stripProps.sort();
    const cacheKey = `questions-${sortedStripProps.join('.')}`;
    const cachedSelector: QuestionsOutput<T> | undefined = selectorCache.get(`${cacheKey}`);

    if (cachedSelector) {
      return cachedSelector;
    }

    const selector = createSelector<RootState, QuestionsState, QuestionStrip<T>[]>(
      (_state) => _state.api.questions,
      (questions) => Object.values(questions)
        .sort((a, b) => a.order - b.order)
        .map<QuestionStrip<T>>((question) => {
          const newQuestion: QuestionStrip<T> = { ...question };

          for (let i = 0; i < stripProps.length; i += 1) {
            const stripProp = stripProps[i];
            delete newQuestion[stripProp];
          }

          return newQuestion;
        }),
    );

    selectorCache.set(`${cacheKey}`, selector);
    return selector;
  }
);
