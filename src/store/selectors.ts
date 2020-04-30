import { createSelector, OutputSelector } from 'reselect';

import store, { RootState } from 'store';

import { NoneQuestion, QuestionsState } from '@feedbax/api/store/questions/types';
import { QuestionType } from '@feedbax/api/types/models/question';

import { PointerType, CurrentQuestion, AnswerFilter } from './types';
import { setCurrentQuestion } from './actions';

type QuestionState = import('@feedbax/api/store/questions/types').QuestionState;
type QuestionStrip<T extends string> = Omit<QuestionState, T> & { [key: string]: any };

type Output<T extends string> = OutputSelector<
  RootState,
  QuestionStrip<T>[],
  (res1: QuestionsState) => QuestionStrip<T>[]
>;

const selectorCache = new Map<string, any>();
const createQuestionsSelector = <T extends string>(...stripProps: T[]): Output<T> => {
  const sortedStripProps = stripProps.sort();
  const cacheKey = sortedStripProps.join('.');
  const cachedSelector: Output<T> | undefined = selectorCache.get(`${cacheKey}`);

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

const pointerTypeSelector = (_state: RootState): PointerType => _state.app.pointerType;
const currentAnswerFilterSelector = (_state: RootState): AnswerFilter => _state.app.answerFilter;
const selectedAnswerSelector = (_state: RootState): string | null => _state.app.selectedAnswer;

const currentQuestionSelector = createSelector<RootState, QuestionsState, number, CurrentQuestion>(
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
  }
);

const isEventLoadedSelector = (_state: RootState): boolean => _state.api.event.id !== '';
const eventCodeSelector = (_state: RootState): string => _state.api.event.slug;

const stripPropsOrderAndLikes = ['answers', 'id', 'eventId', 'text', 'type', 'settings'];
const questionsOrderAndLikes = createQuestionsSelector(...stripPropsOrderAndLikes);
type QuestionsOrderAndLikes = ReturnType<typeof questionsOrderAndLikes>;

const questionsLengthSelector = (_state: RootState): number => _state.api.event.questions.length;

const questionLikesSelector = createSelector<RootState, QuestionsOrderAndLikes, number, string[]>(
  questionsOrderAndLikes,
  (state) => state.app.currentQuestionNumber || 0,
  (questions, currentQuestion) => {
    if (questions.length >= 1) {
      return questions[currentQuestion]?.likes || [];
    }

    return [];
  }
);

const questionLikesLengthSelector = createSelector<
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

export {
  pointerTypeSelector,
  currentQuestionSelector,
  selectedAnswerSelector,
  currentAnswerFilterSelector,
  isEventLoadedSelector,
  eventCodeSelector,
  createQuestionsSelector,
  questionsLengthSelector,
  questionLikesSelector,
  questionLikesLengthSelector,
};
