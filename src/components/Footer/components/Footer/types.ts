import type { ReactNode } from 'react';
import type { Color } from 'assets/styles/theme';

export interface Props {
  children?: ReactNode;
  $color: Color;
}
