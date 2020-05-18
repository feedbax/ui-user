import { lazy } from 'react';
import { css } from 'styled-components';
import media from 'assets/styles/media-queries';

export const component = lazy(() => import('./404'));

const mq = media('xs', 'sm', 'md');
export const styles = {
  content: css`
    ${mq`
      max-width: ${[380, 440, 500]}px;
    `}
  `,
};
