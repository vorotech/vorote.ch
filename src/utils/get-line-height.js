import { css } from 'styled-components';

export const lineHeight = (value) => css`
    line-height: ${props => props.theme.lineHeight * value}em;
`;
