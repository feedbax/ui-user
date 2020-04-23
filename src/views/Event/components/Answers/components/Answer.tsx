import styled from 'styled-components';
import { color, fontFamily } from 'assets/theme';
import media from 'lib/media-queries';

const mq = media('xs', 'sm', 'md');
const Answer = styled.div`
  margin: 15px;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondaryAccent')};

  ${mq`
    font-size: ${[14, 15, 16]}px;
  `}

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

export default Answer;
