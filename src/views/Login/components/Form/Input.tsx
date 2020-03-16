import React from 'react';
import { Input as RebassInput, InputProps } from '@rebass/forms';
import rootElement from 'rootElement';

interface Props extends InputProps {
  children: string;
}

const inputStyles = {
  color: 'accent1',
  bg: 'primary',
  flex: '1 1 100%',
  width: '100%',
  px: [28, 32, 36],
  py: [20, 24, 28],
  outline: 0,
  border: 0,
  borderRadius: 0,
  fontFamily: 'secondary',
  fontSize: [1, 2, 3],
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '&::placeholder': {
    fontStyle: 'italic',
    fontFamily: 'secondary',
    fontWeight: 'bold',
    color: 'accent1',
    opacity: 0.5,
    fontSize: [1, 2, 3]
  }
};

const noScroll = (e: TouchEvent): void => e.preventDefault();

const Input = ({ children: placeholder, ...props }: Props): JSX.Element => {
  return (
    <RebassInput
      {...props}
      placeholder={placeholder}
      sx={inputStyles}
      onFocus={() => rootElement?.addEventListener('touchmove', noScroll)}
      onBlur={() => rootElement?.removeEventListener('touchmove', noScroll)}
    />
  );
};

export default Input;
