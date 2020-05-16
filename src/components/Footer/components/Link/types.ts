import type { ReactNode } from 'react';
import type { Color } from 'assets/theme';

export interface StyledProps {
  to: string;
  children: ReactNode;
  textColor: Color;
}

export interface Props {
  to: string;
  children: ReactNode;
  className?: string;
}
