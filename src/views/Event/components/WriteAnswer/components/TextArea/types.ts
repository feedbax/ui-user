export interface StyledProps {
  paddingRight?: number;
}

export type TextAreaProps = JSX.IntrinsicElements['textarea'];

export interface Props extends TextAreaProps, StyledProps {
  onScrollable: (isScollable: boolean) => void;
}
