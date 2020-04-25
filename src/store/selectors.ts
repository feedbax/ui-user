import { createSelector } from 'reselect';

import { RootState } from 'store';

import { NoneQuestion, QuestionsState } from '@feedbax/api/dist/store/questions/types';
import { QuestionType } from '@feedbax/api/dist/types/models/question';

import { PointerType, Question, AnswerFilter } from './types';

const pointerTypeSelector = (_state: RootState): PointerType => _state.app.pointerType;
const currentAnswerFilterSelector = (_state: RootState): AnswerFilter => _state.app.answerFilter;

const currentQuestionSelector = (_state: RootState): Question =>
  _state.app.currentQuestion || NoneQuestion;

const isEventLoadedSelector = (_state: RootState): boolean => _state.api.event.id !== '';
const eventCodeSelector = (_state: RootState): string => _state.api.event.slug;

type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;
type QuestionStripped = Omit<QuestionState, 'answers' | 'likes' | 'text' | 'type' | 'settings'>;

type StripProps = ['answers', 'likes', 'text', 'type', 'settings'];
const stripProps: StripProps = ['answers', 'likes', 'text', 'type', 'settings'];

const questionsSelector = createSelector<RootState, QuestionsState, QuestionStripped[]>(
  (_state) => _state.api.questions,
  (questions) =>
    Object.values(questions)
      .sort((a, b) => a.order - b.order)
      .map<Question>((question) => {
        const newQuestion = { ...question };

        for (let i = 0; i < stripProps.length; i += 1) {
          const stripProp = stripProps[i];
          delete newQuestion[stripProp];
        }

        return newQuestion;
      })
);

const questionsLengthSelector = (_state: RootState): number => _state.api.event.questions.length;

const questionLikesSelector = createSelector<RootState, QuestionsState, Question, number>(
  (state) => state.api.questions,
  (state) => state.app.currentQuestion || NoneQuestion,
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
  currentAnswerFilterSelector,
  isEventLoadedSelector,
  eventCodeSelector,
  questionsSelector,
  questionsLengthSelector,
  questionLikesSelector,
};
