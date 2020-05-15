import type { Color } from 'assets/theme';

export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>;

export type Apperance = {
  textColor?: Color;
  backgroundColor?: Color;
  position?: string;
  left?: number;
  right?: number;
  top?: number | [number, string];
  transform?: string;
  padding?: number;
  opacity?: number;
};

export type StyledProps = {
  size: number;
  apperance?: Apperance;
};

export interface Props extends ButtonProps {
  icon?: string;
  size?: number;
  apperance?: Apperance;
}
