import React, { Ref } from 'react';

import styled from 'styled-components';
import { fontFamily } from 'assets/styles/theme';
import media from 'assets/styles/media-queries';

const mq = media('xs', 'sm', 'md');

const StyledPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  font-family: ${fontFamily('secondary')};
  cursor: pointer;
  user-select: none;
  position: absolute;
  padding: 20px 30px;
  box-sizing: border-box;

  .question {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .number {
      flex: 0 0 auto;
      position: relative;

      display: inline-block;
      color: rgba(0, 0, 0, 0);
      background: #fff;
      border-radius: 5px;
      margin: 5px;
      margin-right: 15px;
      opacity: 0.3;
      letter-spacing: 4px;

      ${mq`
        font-size: ${[32, 40, 46]}px;
        line-height: ${[21, 25, 28]}px;
        padding-bottom: ${[5.5, 7.5, 9]}px;
        border-bottom-width: ${[3, 3, 4]}px;
        border-radius: ${[9, 10, 11]}px;
      `}
    }

    .text {
      flex: 0 1 auto;

      ${mq`
        font-size: ${[10, 14, 17]}px;
        line-height: ${[13, 17, 20]}px;
      `}

      .word {
        opacity: 0.3;
        display: inline-block;
        color: rgba(0, 0, 0, 0);
        background: #fff;
        margin: 2px;
        letter-spacing: 4px;

        ${mq`
          border-radius: ${[5, 6, 7]}px;
        `}
      }
    }
  }
`;

const QuestionPlaceholder = (_props: unknown, ref: Ref<HTMLDivElement>): JSX.Element => (
  <StyledPlaceholder>
    <div className="question" ref={ref}>
      <div className="number">01</div>
      <div className="text">
        {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
          .split(' ')
          .sort(() => Math.random() - 0.5)
          .map((word) => (
            <span key={word} className="word">
              {word}
            </span>
          ))}
      </div>
    </div>
  </StyledPlaceholder>
);

export default React.memo(React.forwardRef(QuestionPlaceholder));
