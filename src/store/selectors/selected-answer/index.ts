import type { RootState } from 'store';

export const selectedAnswerSelector = (
  (state: RootState): string | null => (
    state.app.selectedAnswer
  )
);
