import React from 'react';
import { Image as RebassImage } from 'rebass';

interface Props {
  image: string;
}

const Image = ({ image }: Props): JSX.Element => (
  <RebassImage
    src={image}
    mb={[12, 14, 16]}
    sx={{
      width: [48, 58, 68],
      height: [48, 58, 68]
    }}
  />
);

export default Image;
