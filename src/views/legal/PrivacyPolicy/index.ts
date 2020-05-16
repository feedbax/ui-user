import { lazy } from 'react';
import { css } from 'styled-components';
import media from 'lib/media-queries';

export const component = lazy(() => import('./PrivacyPolicy'));

const mq = media('xs', 'sm', 'md');
export const styles = {
  content: css`
    ${mq`
      max-width: ${[380, 440, 500]}px;
    `}

    & > * {
      max-width: 100%;
      display: inline-block;
      box-sizing: border-box;
      flex: 1 0 auto;
    }

    align-items: flex-start;
  `,
};
