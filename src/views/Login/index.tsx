import { css } from 'styled-components';
import media from 'assets/styles/media-queries';

import Login from './Login';

export const component = Login;

const mq = media('xs', 'sm', 'md');
export const styles = {
  content: css`
    ${mq`
      max-width: ${[380, 440, 500]}px;
    `}
  `,
};
