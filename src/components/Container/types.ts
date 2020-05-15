import type { ReactNode } from 'react';
import type { FlattenInterpolation } from 'styled-components';
import type { ThemeProps } from 'assets/theme';

export type Style = FlattenInterpolation<ThemeProps>;

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
