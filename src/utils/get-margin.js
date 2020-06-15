import { css } from 'styled-components';

export const marginTop = (value) => css`
    margin-top: ${props => props.theme.spacing * value}px;
`;

export const marginBottom = (value) => css`
    margin-bottom: ${props => props.theme.spacing * value}px;
`;

export const margin = (top, right, bottom, left) => {
    if (!left && !bottom) {
        return css`
            margin: ${props => props.theme.spacing * top}px ${props => props.theme.spacing * right}px;
        `;
    }
    if (!left || left === right) {
        return css`
            margin: ${props => props.theme.spacing * top}px ${props => props.theme.spacing * right}px ${props => props.theme.spacing * bottom}px;
        `;
    }
    
    return css`
        margin: ${props => props.theme.spacing * top}px ${props => props.theme.spacing * right}px ${props => props.theme.spacing * bottom}px ${props => props.theme.spacing * left}px;
    `;
}
