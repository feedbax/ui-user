import type { Props as ButtonProps } from 'components/ButtonNeumorphism';

export interface Props extends Partial<ButtonProps> {
  answerText: string;
  isScrollable: boolean;
}

export type PostAnswer = {
  (props: Props): JSX.Element;
}
