import React, { useContext } from 'react';
import { Image as RebassImage, SxStyleProp } from 'rebass';
import { LogoProps, LogoSize } from './Logo';

interface Props {
  image: string;
}

const Image = ({ image }: Props): JSX.Element => {
  const { size } = useContext(LogoProps);
  let imageStyle: SxStyleProp = {};

  // eslint-disable-next-line default-case
  switch (size) {
    case LogoSize.Small: {
      imageStyle = {
        width: [32, 34, 36],
        height: [32, 34, 36],
        marginBottom: ['6px', '8px', '10px'],
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

  return <RebassImage src={image} sx={imageStyle} />;
};

export default React.memo(Image);
