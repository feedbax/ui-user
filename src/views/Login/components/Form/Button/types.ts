export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>;

export interface StyledProps {
  height?: number[];
}

export interface Props extends ButtonProps, StyledProps {
  loading?: boolean;
  children: string;
}
