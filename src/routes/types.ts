import type { useLocation, RouteProps } from 'react-router-dom';
import type { FlattenInterpolation } from 'styled-components';
import type { ThemeProps } from 'assets/styles/theme';

type Comp = () => JSX.Element;
type MemoComp = React.MemoExoticComponent<Comp>;
type LazyComp = React.LazyExoticComponent<Comp>;
type LazyMemoComp = React.LazyExoticComponent<MemoComp>;

export interface Routes extends RouteProps {
  key: string;
  component: Comp | MemoComp | LazyComp | LazyMemoComp;
  styles?: {
    wrapper?: FlattenInterpolation<ThemeProps>;
    content?: FlattenInterpolation<ThemeProps>;
  };
}

type Location = ReturnType<typeof useLocation> | undefined;

export type Locations = {
  prev: Location;
  curr: Location;
  exitComplete: boolean;
  isInitial: boolean;
};
