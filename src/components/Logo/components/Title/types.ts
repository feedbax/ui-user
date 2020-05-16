import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export type StyledPropsApperance = {
  fontSize: number[];
};

export interface StyledProps {
  apperance: StyledPropsApperance;
}
