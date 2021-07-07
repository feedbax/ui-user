import { createSelector, OutputSelector } from 'reselect';
import { AnswerFilter } from 'store/types';
import { isFilterAble } from '@feedbax/backend-api/store/modules/questions/types';

import type { ApiStateDefault as ApiState } from '@feedbax/backend-api/store';
import type { QuestionsState } from '@feedbax/backend-api/store/modules/questions/types';
import type { AnswersState, AnswerState } from '@feedbax/backend-api/store/modules/answers/types';

type Output = (
  OutputSelector<
    ApiState,
    AnswerState[],
    (res1: QuestionsState, res2: AnswersState) => AnswerState[]
  >
);

const sortAnswers = (answers: AnswerState[], filter: AnswerFilter): AnswerState[] => {
  switch (filter) {
    case AnswerFilter.RECENT:
      return answers.sort((a, b) => b.time - a.time);

    case AnswerFilter.POPULAR:
      return answers.sort((a, b) => b.likes - a.likes || b.time - a.time);

    case AnswerFilter.MINE:
      return answers.filter((a) => a.isMine).sort((a, b) => b.time - a.time);

    default:
      return answers;
  }
};

const selectorCache = new Map<string, Output>();
const answersSelector = (questionNumber: number, filter: AnswerFilter): Output => {
  const cachedSelector = selectorCache.get(`${questionNumber}-${filter}`);

  if (cachedSelector) {
    return cachedSelector;
  }

  const selector = createSelector<ApiState, QuestionsState, AnswersState, AnswerState[]>(
    (_state) => _state.api.questions,
    (_state) => _state.api.answers,
    (questions, answers) => {
      const questionsOrdered = Object.values(questions).sort((a, b) => a.order - b.order);
      const currentQuestion = questionsOrdered[questionNumber];

      if (!currentQuestion) return [];

      const answerIds = currentQuestion.answers;
      const _answers: AnswerState[] = [];

      for (let i = 0; i < answerIds.length; i += 1) {
        const answerId = answerIds[i];
        const answer = answers[answerId];

        if (answer) _answers.push(answer);
      }

      if (isFilterAble(currentQuestion)) {
        return sortAnswers(_answers, filter);
      }

      return sortAnswers(_answers, AnswerFilter.RECENT);
    },
  );

  selectorCache.set(`${questionNumber}-${filter}`, selector);
  return selector;
};

export { answersSelector };
