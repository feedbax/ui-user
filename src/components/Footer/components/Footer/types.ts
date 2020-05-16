import type { ReactNode } from 'react';
import type { Color } from 'assets/theme';

export interface Props {
  children?: ReactNode;
  $color: Color;
}
