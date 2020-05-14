type ResetStateAction = import('@feedbax/backend-api/store/types').ResetStateAction;
type QuestionState = import('@feedbax/backend-api/store/modules/questions/types').QuestionState;

export type CurrentQuestion = Omit<QuestionState, 'answers' | 'likes'>;

export enum AnswerFilter {
  POPULAR,
  RECENT,
  MINE,
}

export enum PointerType {
  MOUSE,
  TOUCH,
}

export const answerFilters = Object.values(AnswerFilter).filter(
  (filter) => typeof filter === 'number'
) as number[];

export interface AppState {
  currentQuestionNumber?: number;
  answerFilter: AnswerFilter;
  pointerType: PointerType;
  selectedAnswer: string | null;
}

export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_ANSWER_FILTER = 'SET_ANSWER_FILTER';
export const SET_POINTER_TYPE = 'SET_POINTER_TYPE';
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER';

export interface SetCurrentQuestionAction {
  type: typeof SET_CURRENT_QUESTION;
  payload: number;
}

export interface SetAnswerFilterAction {
  type: typeof SET_ANSWER_FILTER;
  payload: AnswerFilter;
}

export interface SetPointerTypeAction {
  type: typeof SET_POINTER_TYPE;
  payload: PointerType;
}

export interface SetSelectedAnswerAction {
  type: typeof SET_SELECTED_ANSWER;
  payload: string | null;
}

export type AppActionTypes =
  | SetCurrentQuestionAction
  | SetAnswerFilterAction
  | SetPointerTypeAction
  | SetSelectedAnswerAction
  | ResetStateAction;
