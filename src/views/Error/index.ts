import { css } from 'styled-components';
import media from 'lib/media-queries';

import Error404 from './404';

export const component = Error404;

const mq = media('xs', 'sm', 'md');
export const styles = {
  content: css`
    ${mq`
      max-width: ${[380, 440, 500]}px;
    `}
  `,
};
