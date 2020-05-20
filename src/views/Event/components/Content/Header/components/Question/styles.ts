import { css } from 'styled-components';
import { fontFamily, color } from 'assets/styles/theme';
import { PointerType } from 'store/types';
import media from 'assets/styles/media-queries';

import type { QuestionWrapperProps, QuestionTextProps, WrapperProps } from './types';

const mq = media('xs', 'sm', 'md');

export const questionNumberStyle = css`
  flex: 0 0 auto;
  position: relative;
  margin-right: 15px;

  font-family: ${fontFamily('primary')};
  font-weight: 700;

  border-bottom-color: ${color('accent1')};
  border-bottom-style: solid;

  ${mq`
    font-size: ${[32, 40, 46]}px;
    line-height: ${[21, 25, 28]}px;
    padding-bottom: ${[5.5, 7.5, 9]}px;
    border-bottom-width: ${[3, 3, 4]}px;
  `}
`;

export const questionTextStyle = css<QuestionTextProps>`
  flex: 0 1 auto;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${mq`
    font-size: ${[18, 22, 25]}px;
    line-height: ${[21, 25, 28]}px;    
  `}

  & img.emoji {
    display: inline-block;
    margin: 0 2px;

    ${mq`
      width: ${[22, 26, 29]}px;
      height: ${[22, 26, 29]}px;
    `}
  }
`;

export const questionWrapperStyle = css<QuestionWrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: padding 0.3s ease;
  position: relative;

  ${({ pointerType }): string => `
    ${pointerType === PointerType.MOUSE ? 'padding: 0 20px;' : ''}
  `}
`;

export const wrapperStyle = css<WrapperProps>`
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  user-select: none;
  position: relative;

  font-family: ${fontFamily('secondary')};
  color: ${color('accent1')};

  flex: 0 0 ${(props): number => props.questionHeight}px;
`;
