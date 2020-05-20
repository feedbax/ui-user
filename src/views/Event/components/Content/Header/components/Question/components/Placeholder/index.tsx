import React, { Ref } from 'react';
import { StyledPlaceholder } from './styled';

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

export default React.memo(
  React.forwardRef(
    QuestionPlaceholder,
  ),
);
