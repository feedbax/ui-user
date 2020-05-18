import { createSelector } from 'reselect';
import { currentQuestionSelector } from 'store/selectors';

import type { RootState } from 'store';
import type { CurrentQuestion } from 'store/types';
import type { AnswersState } from '@feedbax/backend-api/store/modules/answers/types';
import type { AnswerStrip, AnswersOutput } from './types';


const selectorCache = new Map<string, any>();

export const createCurrentAnswersSelector = <T extends string>(
  ...stripProps: T[]
): AnswersOutput<T> => {
  const sortedStripProps = stripProps.sort();
  const cacheKey = `answers-${sortedStripProps.join('.')}`;
  const cachedSelector: AnswersOutput<T> | undefined = selectorCache.get(`${cacheKey}`);

  if (cachedSelector) {
    return cachedSelector;
  }

  const selector = createSelector<RootState, CurrentQuestion, AnswersState, AnswerStrip<T>[]>(
    currentQuestionSelector,
    (_state) => _state.api.answers,
    (question, answers) => Object.values(answers)
      .filter((a) => a.questionId === question.id)
      .map<AnswerStrip<T>>((answer) => {
        const newAnswer: AnswerStrip<T> = { ...answer };

        for (let i = 0; i < stripProps.length; i += 1) {
          const stripProp = stripProps[i];
          delete newAnswer[stripProp];
        }

        return newAnswer;
      }),
  );

  selectorCache.set(`${cacheKey}`, selector);
  return selector;
};
