import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';

export interface Props {
  children?: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
