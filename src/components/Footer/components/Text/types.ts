import type { ReactNode } from 'react';
import type { Color } from 'assets/theme';

export interface StyledProps {
  textColor: Color;
}

export interface Props {
  children: ReactNode;
}
