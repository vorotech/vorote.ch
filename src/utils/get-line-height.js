import { css } from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const lineHeight = (value) => css`
    line-height: ${(props) => props.theme.lineHeight * value}em;
`;
