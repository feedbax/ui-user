type ResetStateAction = import('@feedbax/api/dist/store/types').ResetStateAction;
type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;

export type Question = Omit<QuestionState, 'answers' | 'likes'>;

export enum AnswerFilter {
  POPULAR,
  RECENT,
  MINE,
}

export const answerFilters = Object.values(AnswerFilter).filter(
  (filter) => typeof filter === 'number'
) as number[];

export interface AppState {
  currentQuestion?: Question;
  answerFilter: AnswerFilter;
}

export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_ANSWER_FILTER = 'SET_ANSWER_FILTER';

export interface SetCurrentQuestionAction {
  type: typeof SET_CURRENT_QUESTION;
  payload: Question;
}

export interface SetAnswerFilterAction {
  type: typeof SET_ANSWER_FILTER;
  payload: AnswerFilter;
}

export type AppActionTypes = SetCurrentQuestionAction | SetAnswerFilterAction | ResetStateAction;
