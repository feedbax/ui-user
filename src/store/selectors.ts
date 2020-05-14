import { createSelector, OutputSelector } from 'reselect';

import store, { RootState } from 'store';

import { NoneQuestion } from '@feedbax/backend-api/store/modules/questions/types';
import { QuestionType } from '@feedbax/backend-api/shared/models/question';

import { PointerType, CurrentQuestion, AnswerFilter } from './types';
import { setCurrentQuestion } from './actions';

type QuestionsState = import('@feedbax/backend-api/store/modules/questions/types').QuestionsState;
type QuestionState = import('@feedbax/backend-api/store/modules/questions/types').QuestionState;
type QuestionStrip<T extends string> = Omit<QuestionState, T> & { [key: string]: any };

type QuestionsOutput<T extends string> = OutputSelector<
  RootState,
  QuestionStrip<T>[],
  (res1: QuestionsState) => QuestionStrip<T>[]
>;

const selectorCache = new Map<string, any>();

export const createQuestionsSelector = <T extends string>(
  ...stripProps: T[]
): QuestionsOutput<T> => {
  const sortedStripProps = stripProps.sort();
  const cacheKey = `questions-${sortedStripProps.join('.')}`;
  const cachedSelector: QuestionsOutput<T> | undefined = selectorCache.get(`${cacheKey}`);

  if (cachedSelector) {
    return cachedSelector;
  }

  const selector = createSelector<RootState, QuestionsState, QuestionStrip<T>[]>(
    (_state) => _state.api.questions,
    (questions) =>
      Object.values(questions)
        .sort((a, b) => a.order - b.order)
        .map<QuestionStrip<T>>((question) => {
          const newQuestion: QuestionStrip<T> = { ...question };

          for (let i = 0; i < stripProps.length; i += 1) {
            const stripProp = stripProps[i];
            delete newQuestion[stripProp];
          }

          return newQuestion;
        })
  );

  selectorCache.set(`${cacheKey}`, selector);
  return selector;
};

type AnswersState = import('@feedbax/backend-api/store/modules/answers/types').AnswersState;
type AnswerState = import('@feedbax/backend-api/store/modules/answers/types').AnswerState;
type AnswerStrip<T extends string> = Omit<AnswerState, T> & { [key: string]: any };

type AnswersOutput<T extends string> = OutputSelector<
  RootState,
  AnswerStrip<T>[],
  (res1: CurrentQuestion, res2: AnswersState) => AnswerStrip<T>[]
>;

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
    (question, answers) =>
      Object.values(answers)
        .filter((a) => a.questionId === question.id)
        .map<AnswerStrip<T>>((answer) => {
          const newAnswer: AnswerStrip<T> = { ...answer };

          for (let i = 0; i < stripProps.length; i += 1) {
            const stripProp = stripProps[i];
            delete newAnswer[stripProp];
          }

          return newAnswer;
        })
  );

  selectorCache.set(`${cacheKey}`, selector);
  return selector;
};

export const pointerTypeSelector = (_state: RootState): PointerType => _state.app.pointerType;
export const currentAnswerFilterSelector = (_state: RootState): AnswerFilter =>
  _state.app.answerFilter;
export const selectedAnswerSelector = (_state: RootState): string | null =>
  _state.app.selectedAnswer;

export const currentQuestionSelector = createSelector<
  RootState,
  QuestionsState,
  number,
  CurrentQuestion
>(
  (state) => state.api.questions,
  (state) => {
    console.log(state);
    return state.app.currentQuestionNumber || 0;
  },
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
  }
);

export const isEventLoadedSelector = (_state: RootState): boolean => _state.api.event.id !== '';
export const eventCodeSelector = (_state: RootState): string => _state.api.event.slug;

const stripPropsOrderAndLikes = ['answers', 'id', 'eventId', 'text', 'type', 'settings'];
const questionsOrderAndLikes = createQuestionsSelector(...stripPropsOrderAndLikes);
type QuestionsOrderAndLikes = ReturnType<typeof questionsOrderAndLikes>;

export const questionsLengthSelector = (_state: RootState): number =>
  _state.api.event.questions.length;

export const questionLikesSelector = createSelector<
  RootState,
  QuestionsOrderAndLikes,
  number,
  string[]
>(
  questionsOrderAndLikes,
  (state) => state.app.currentQuestionNumber || 0,
  (questions, currentQuestion) => {
    if (questions.length >= 1) {
      return questions[currentQuestion]?.likes || [];
    }

    return [];
  }
);

export const questionLikesLengthSelector = createSelector<
  RootState,
  QuestionsState,
  CurrentQuestion,
  number
>(
  (state) => state.api.questions,
  currentQuestionSelector,
  (questions, currentQuestion) => {
    if (currentQuestion.type !== QuestionType.NONE) {
      return questions[currentQuestion.id]?.likes.length || 0;
    }

    return 0;
  }
);
