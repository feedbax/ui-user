import { css } from 'styled-components';
import media from 'assets/styles/media-queries';
import { color, fontFamily } from 'assets/styles/theme';

import type { AnswerTextProps } from './types';

const mq = media('xs', 'sm', 'md');

export const answerStyle = css`
  margin: 15px;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondaryAccent')};

  display: flex;

  ${mq`
    font-size: ${[14, 15, 16]}px;
  `}

  &:nth-of-type(2) {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.placeholder--loading {
    flex-wrap: wrap;
  }

  &.placeholder--loading .word {
    color: rgba(0, 0, 0, 0);
    background-color: ${color('accent1')};
    display: inline-block;
    margin: 2px;
    opacity: 0.2;
    border-radius: 5px;
    font-size: 12px;
    letter-spacing: 4px;
  }
`;

export const answerTextStyle = css<AnswerTextProps>`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: break-spaces;

  & img.emoji {
    display: inline-block;
    margin: 0 1px;

    ${mq`
      width: ${[18, 19, 20]}px;
      height: ${[18, 19, 20]}px;
    `}
  }
`;

export const answerLikesStyle = css`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  padding-left: 8px;
`;

export const likesCountStyle = css`
  padding-right: 8px;
  min-width: 30px;
  text-align: right;

  ${mq`
    font-size: ${[12, 13, 14]}px;
  `}
`;
