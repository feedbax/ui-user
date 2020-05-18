import { css } from 'styled-components';
import media from 'assets/styles/media-queries';

import type { Style } from 'assets/styles/theme';
import type { StyledProps } from './types';

const mq = media('xs', 'sm', 'md');

export const imageStyles = css<StyledProps>`
  ${(props): Style => mq`
    width: ${props.apperance.width}px;
    height: ${props.apperance.height}px;
    margin-bottom: ${props.apperance.marginBottom}px;
  `}
`;
