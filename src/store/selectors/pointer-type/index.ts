import type { RootState } from 'store';
import type { PointerType } from 'store/types';

export const pointerTypeSelector = (
  (state: RootState): PointerType => (
    state.app.pointerType
  )
);
