import type { ReactNode } from 'react';

export interface FilterProps {
  active: boolean;
  children: ReactNode;
  disabled: boolean;
}
