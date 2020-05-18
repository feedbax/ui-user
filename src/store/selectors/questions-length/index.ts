import type { RootState } from 'store';

export const questionsLengthSelector = (
  (_state: RootState): number => _state.api.event.questions.length
);
