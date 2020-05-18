import React from 'react';
import styled from 'styled-components';
import { color, fontFamily } from 'assets/styles/theme';
import media from 'assets/styles/media-queries';

type InputProps = Omit<JSX.IntrinsicElements['input'], 'ref' | 'children'>;

interface Props extends InputProps {
  children: string;
}

const mq = media('xs', 'sm', 'md');

const StyledInput = styled.input<InputProps>`
  flex: 1 1 100%;
  width: 100%;
  outline: 0;
  border: 0;
  border-radius: 0;
  font-weight: bold;
  text-transform: uppercase;
  box-sizing: border-box;
  margin: 0;

  color: ${color('accent1')};
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondary')};

  &::placeholder {
    font-style: italic;
    font-weight: bold;
    opacity: 0.5;

    color: ${color('accent1')};
    font-family: ${fontFamily('secondary')};
  }

  ${mq`
    padding: ${[20, 24, 28]}px ${[28, 32, 36]}px;
    font-size: ${[16, 18, 22]}px;

    &::placeholder {
      font-size: ${[16, 18, 22]}px;
    }
  `}
`;

const Input = ({ children: placeholder, ...props }: Props): JSX.Element => (
  <StyledInput {...props} placeholder={placeholder} />
);

export default React.memo(Input);
