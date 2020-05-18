export type InputProps = Omit<JSX.IntrinsicElements['input'], 'ref' | 'children'>;

export interface Props extends InputProps {
  children: string;
}
