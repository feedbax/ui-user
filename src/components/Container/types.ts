import type { ReactNode } from 'react';
import type { Style } from 'assets/styles/theme';

export interface Styles {
  styles?: Style;
}

export interface StyledProps {
  bgProtrait: string;
  bgLandscape: string;
}

export interface Props {
  children: ReactNode;
  bgProtrait: string;
  bgLandscape: string;
  styles?: {
    wrapper?: Style;
    content?: Style;
  };
}
