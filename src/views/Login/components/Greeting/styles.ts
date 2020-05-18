import { css } from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';
import media from 'assets/styles/media-queries';

const mq = media('xs', 'sm', 'md');

export const textStyles = css`
  color: ${color('primary')};
  font-family: ${fontFamily('secondary')};
  font-weight: bold;
  text-align: center;

  ${mq`
    font-size: ${[82, 92, 102]}px;
  `}
`;
