import { css } from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';
import media from 'assets/styles/media-queries';

import type { ColorFn } from 'assets/styles/theme';
import type { AnswerTextProps, PercentageProps } from './types';

const mq = media('xs', 'sm', 'md');

export const answerStyle = css`
  margin: 0 15px;
  padding: 20px 15px;
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondaryAccent')};

  display: flex;
  cursor: pointer;

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    left: 15px;
    bottom: 0;
    width: -webkit-calc(100% - 30px);
    width: -moz-calc(100% - 30px);
    width: calc(100% - 30px);
    height: 1px;
    background-color: #3a556a;
  }

  ${mq`
    font-size: ${[14, 15, 16]}px;
  `}
`;

export const answerTextStyle = css<AnswerTextProps>`
  flex: 1 1 auto;
  display: inline;
  white-space: break-spaces;
  margin: auto 0;
  transition: transform 0.3s ease;
  white-space: break-spaces;

  ${({ hasLiked }): string => `
    transform: translateY(${hasLiked ? 5 : 0}px);
  `}

  & img.emoji {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1px;

    ${mq`
      width: ${[18, 19, 20]}px;
      height: ${[18, 19, 20]}px;
    `}
  }
`;

export const answerLikeStyle = css`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  padding-left: 8px;
  position: relative;
  min-height: 28px;
`;

export const percentageStyle = css<PercentageProps>`
  font-size: 22px;
  color: ${({ hasLiked }): ColorFn => color(hasLiked ? 'accent2' : 'accent1')};
  font-weight: ${({ hasLiked }): string => (hasLiked ? 'bold' : 'normal')};
`;

export const percentageBarStyle = css<PercentageProps>`
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  height: 5px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 0;

  & .bar {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${({ hasLiked }): ColorFn => color(hasLiked ? 'accent2' : 'accent1')};
  }
`;
