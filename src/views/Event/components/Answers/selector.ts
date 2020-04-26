import { createSelector, OutputSelector } from 'reselect';
import { AnswerFilter } from 'store/types';
import api from 'lib/api';
import { isFilterAble } from '@feedbax/api/dist/store/questions/types';

type ApiState = import('@feedbax/api/dist/store').ApiStateDefault;
type QuestionsState = import('@feedbax/api/dist/store/questions/types').QuestionsState;
type AnswersState = import('@feedbax/api/dist/store/answers/types').AnswersState;

type AnswerState = import('@feedbax/api/dist/store/answers/types').AnswerState;

type Output = OutputSelector<
  ApiState,
  AnswerState[],
  (res1: QuestionsState, res2: AnswersState) => AnswerState[]
>;

const sortAnswers = (answers: AnswerState[], filter: AnswerFilter): AnswerState[] => {
  switch (filter) {
    case AnswerFilter.RECENT:
      return answers.sort((a, b) => b.time - a.time);

    case AnswerFilter.POPULAR:
      return answers.sort((a, b) => b.likes.length - a.likes.length || b.time - a.time);

    case AnswerFilter.MINE:
      return answers.filter((a) => a.author === api.uuid).sort((a, b) => b.time - a.time);

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

        if (!answer) return [];

        _answers.push(answer);
      }

      if (isFilterAble(currentQuestion)) {
        return sortAnswers(_answers, filter);
      }

      return sortAnswers(_answers, AnswerFilter.RECENT);
    }
  );

  selectorCache.set(`${questionNumber}-${filter}`, selector);
  return selector;
};

export { answersSelector };
