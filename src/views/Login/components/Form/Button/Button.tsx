import React from 'react';

import styled, { FlattenInterpolation } from 'styled-components';
import media from 'lib/media-queries';
import { AnimatePresence } from 'framer-motion';

import { ThemeProps, fontFamily, color } from 'assets/theme';

import MotionLabel from './components/MotionLabel';
import MotionDots from './components/MotionDots';

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>;

interface StyledProps {
  height?: number[];
}

interface Props extends ButtonProps, StyledProps {
  loading?: boolean;
  children: string;
}

const mq = media('xs', 'sm', 'md');

const StyledButton = styled.button<StyledProps>`
  cursor: pointer;
  font-weight: bold;
  border-radius: 0;
  width: 100%;
  text-align: left;
  font-family: ${fontFamily('secondary')};
  color: ${color('primary')};
  background-color: ${color('accent1')};

  outline: 0;
  border: 0;

  ${(props: StyledProps): FlattenInterpolation<ThemeProps> => mq`
    height: ${props?.height || 'auto'}px;
    font-size: ${[18, 22, 26]}px;
    padding: ${[12, 16, 20]}px ${[28, 32, 36]}px;
  `}
`;

const Button = ({ loading = false, children: label, ...props }: Props): JSX.Element => (
  <StyledButton {...props}>
    <AnimatePresence exitBeforeEnter initial={false}>
      {loading && <MotionDots />}
      {!loading && <MotionLabel label={label} />}
    </AnimatePresence>
  </StyledButton>
);

export default React.memo(Button);
