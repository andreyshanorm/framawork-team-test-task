import type { FC } from 'react';
import React from 'react';

type Props = {
  fillColor: string;
};

export const CircIcon: FC<Props> = ({ fillColor }) => (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.312255 0.283494C0.487119 0.0697714 0.80213 0.0382703 1.01585 0.213134L7.61585 5.61313C7.73192 5.7081 7.79923 5.85015 7.79923 6.00011C7.79923 6.15008 7.73192 6.29213 7.61585 6.38709L1.01585 11.7871C0.80213 11.962 0.487119 11.9305 0.312255 11.7167C0.137391 11.503 0.168893 11.188 0.382615 11.0131L6.50964 6.00011L0.382615 0.987091C0.168892 0.812228 0.137391 0.497216 0.312255 0.283494Z"
      fill={fillColor}
    />
  </svg>
);
