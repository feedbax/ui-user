import type { RootState } from 'store';

export const eventCodeSelector = (
  (_state: RootState): string => (
    _state.api.event.slug
  )
);
