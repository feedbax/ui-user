import { css } from 'styled-components';
import media from 'lib/media-queries';

import type { FlattenInterpolation } from 'styled-components';
import type { ThemeProps } from 'assets/theme';
import type { StyledProps } from './types';

const mq = media('xs', 'sm', 'md');

const typeSuffix = (arg: number | string): string => {
  if (typeof arg === 'string') return '';
  if (typeof arg === 'number') return 'px';

  return '';
};

const autoSuffix = (arg: number | number[] | string | string[]): string => {
  if (Array.isArray(arg)) {
    return typeSuffix(arg[0]);
  }

  return typeSuffix(arg);
};

export const containerStyles = css`
  flex: 0 0 auto;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props: StyledProps): FlattenInterpolation<ThemeProps> => mq`
    margin: ${props.margin || 0}${autoSuffix(props.margin || 0)};
    padding: ${props.padding || 0}${autoSuffix(props.padding || 0)};
  `}
`;

export const linkStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
`;
