import type { OutputSelector } from 'reselect';
import type { QuestionsState, QuestionState } from '@feedbax/backend-api/store/modules/questions/types';
import type { RootState } from 'store';

export type QuestionStrip<T extends string> = Omit<QuestionState, T> & { [key: string]: any };
export type QuestionsOutput<T extends string> = (
  OutputSelector<
    RootState,
    QuestionStrip<T>[],
    (res1: QuestionsState) => QuestionStrip<T>[]
  >
);
