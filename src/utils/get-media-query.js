import { css } from 'styled-components';
import { SCREEN_SIZES } from '../constants';

const sizes = {
  xl: SCREEN_SIZES.LARGE_DESKTOP,
  lg: SCREEN_SIZES.DESKTOP,
  md: SCREEN_SIZES.TABLET,
  sm: SCREEN_SIZES.LANDSCAPE_PHONE
};

// Style from specified breakpoint and up
export const mediaUp = Object
  .keys(sizes)
  .reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media screen and (min-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }`;
    return acc;
  }, {});

// Style from specified breakpoint and down
export const mediaDown = Object
  .keys(sizes)
  .reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] - 0.02 / 16}em) {
        ${css(...args)}
      }`;
    return acc;
  }, {});
