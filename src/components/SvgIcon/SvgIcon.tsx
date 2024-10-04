import type { FC } from 'react';
import React from 'react';

type PropTypes = {
  src: string;
  alt: string;
};

export const SvgIcon: FC<PropTypes> = ({ src, alt }) => <img src={src} alt={alt} />;
