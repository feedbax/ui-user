import type { RootState } from 'store';

export const isEventLoadedSelector = (
  (state: RootState): boolean => (
    state.api.event.id !== ''
  )
);
