import type { ReactNode } from 'react';
import type { Color } from 'assets/styles/theme';

export interface StyledProps {
  textColor: Color;
}

export interface Props {
  children: ReactNode;
}
