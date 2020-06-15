// @flow strict
import React from 'react';
import styled from 'styled-components';

const StyledCopyright = styled.div`
  color: var(--color-gray500);
  font-size: ${props => props.theme.fontSizes.small}px;
`;

type Props = {
  copyright: string
};

const Copyright = ({ copyright }: Props) => (
  <StyledCopyright>
    {copyright}
  </StyledCopyright>
);

export default Copyright;
