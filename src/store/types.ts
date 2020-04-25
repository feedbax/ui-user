type ResetStateAction = import('@feedbax/api/dist/store/types').ResetStateAction;
type QuestionState = import('@feedbax/api/dist/store/questions/types').QuestionState;

export type Question = Omit<QuestionState, 'answers' | 'likes'>;

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
  currentQuestion?: Question;
  answerFilter: AnswerFilter;
  pointerType: PointerType;
}

export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_ANSWER_FILTER = 'SET_ANSWER_FILTER';
export const SET_POINTER_TYPE = 'SET_POINTER_TYPE';

export interface SetCurrentQuestionAction {
  type: typeof SET_CURRENT_QUESTION;
  payload: Question;
}

export interface SetAnswerFilterAction {
  type: typeof SET_ANSWER_FILTER;
  payload: AnswerFilter;
}

export interface SetPointerTypeAction {
  type: typeof SET_POINTER_TYPE;
  payload: PointerType;
}

export type AppActionTypes =
  | SetCurrentQuestionAction
  | SetAnswerFilterAction
  | SetPointerTypeAction
  | ResetStateAction;
