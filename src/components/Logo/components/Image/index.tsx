import React, { useContext } from 'react';

import { LogoProps, LogoSize } from '../Logo';
import { StyledImage } from './styled';

import type { StyledPropsApperance, Props } from './types';

const Image = ({ image }: Props): JSX.Element => {
  const { size } = useContext(LogoProps);
  let imageStyle: StyledPropsApperance = {
    width: [0],
    height: [0],
    marginBottom: [0],
  };

  // eslint-disable-next-line default-case
  switch (size) {
    case LogoSize.Small: {
      imageStyle = {
        width: [32, 34, 36],
        height: [32, 34, 36],
        marginBottom: [6, 8, 10],
      };

      break;
    }

    case LogoSize.Regular: {
      imageStyle = {
        width: [48, 58, 68],
        height: [48, 58, 68],
        marginBottom: [12, 14, 16],
      };

      break;
    }
  }

  return <StyledImage src={image} apperance={imageStyle} />;
};

export default React.memo(Image);
