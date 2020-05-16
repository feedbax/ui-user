import type { ReactNode } from 'react';

export enum LogoSize {
  Small,
  Regular,
}

export interface Props extends StyledProps {
  children?: ReactNode;
  size?: LogoSize;
  link?: string;
}

export interface StyledProps {
  padding?: number | number[] | string | string[];
  margin?: number | number[] | string | string[];
}

export interface CustomLinkProps {
  className?: string;
  children: ReactNode;
  to: string;
}
