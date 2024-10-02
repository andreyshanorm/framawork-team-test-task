import React, { FC } from "react";

type PropTypes = {
  src: string;
  alt: string;
  size?: string;
};

export const SvgIcon: FC<PropTypes> = ({ src, alt, size }) => {
  return <img src={src} alt={alt} />;
};
