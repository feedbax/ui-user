import React from 'react';
import styled, { keyframes, FlattenSimpleInterpolation, css } from 'styled-components';
import { color } from 'assets/theme';

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = { className?: string };

const $LoadingAnimation = ({ className }: Props): JSX.Element => (
  <div className={className}>
    <div className="circle cirlce-1" />
    <div className="circle circle-2" />
  </div>
);

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
  }
`;

const LoadingAnimation = styled($LoadingAnimation)`
  flex: 0 0 auto;
  position: relative;
  width: 80px;
  height: 80px;

  & .circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    
    animation: ${bounce} 2.0s infinite ease-in-out;
    background-color: ${color('primary')};
  }

  & .circle-2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
`;

type PropsLoading = {
  bgLandscape: string;
  bgProtrait: string;
}

const LoadingBackground = styled.div<PropsLoading>`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  background-color: ${color('accent2')};

  ${(props): FlattenSimpleInterpolation => css`
    @media (orientation: portrait) {
      background-image: url(${props.bgProtrait});
    }

    @media (orientation: landscape) {
      background-image: url(${props.bgLandscape});
    }
  `}
`;

const Loading = (props: PropsLoading): JSX.Element => (
  <>
    <LoadingBackground {...props} />
    <LoadingWrapper>
      <LoadingAnimation />
    </LoadingWrapper>
  </>
);

export default Loading;
