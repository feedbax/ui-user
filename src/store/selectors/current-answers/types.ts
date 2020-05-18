import type { OutputSelector } from 'reselect';
import type { RootState } from 'store';
import type { CurrentQuestion } from 'store/types';

import type { AnswersState, AnswerState } from '@feedbax/backend-api/store/modules/answers/types';

export type AnswerStrip<T extends string> = Omit<AnswerState, T> & { [key: string]: any };

export type AnswersOutput<T extends string> = (
  OutputSelector<
    RootState,
    AnswerStrip<T>[],
    (res1: CurrentQuestion, res2: AnswersState) => AnswerStrip<T>[]
  >
);
