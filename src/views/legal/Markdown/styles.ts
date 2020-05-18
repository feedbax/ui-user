import { keyframes, css } from 'styled-components';
import media from 'assets/styles/media-queries';

const shine = keyframes`
  from {
    background-position: right center;
  }

  to {
    background-position: left center;
  }
`;

export const stylesLoading = css`
  width: 100%;
  overflow: hidden;
  position: relative;

  & > div {
    width: 100%;
    height: 16px;

    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6) 25%,
      rgba(255, 255, 255, 0.8) 37.5%,
      rgba(255, 255, 255, 1) ,
      rgba(255, 255, 255, 0.8) 62.5%,
      rgba(255, 255, 255, 0.6) 75%
    );

    background-size: 400% auto;
    background-position: right center;

    margin: 8px 0;
    opacity: 0.6;
    overflow: hidden;
    position: relative;

    animation: ${shine} 2s linear infinite;
  }
`;

const mq = media('xs', 'sm', 'md');

export const styles = {
  content: css`
    ${mq`
      max-width: ${[380, 440, 500]}px;
    `}

    .content {
      width: 100%;
      max-width: 100%;

      a, code {
        white-space: normal;
        overflow-wrap: break-word;
      }
    }

    align-items: flex-start;
  `,
};
