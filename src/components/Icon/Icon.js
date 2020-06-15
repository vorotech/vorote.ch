// @flow strict
import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  font-style: normal;
  font-weight: normal;
  speak: none;
  margin-right: .2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: .2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

type Props = {
  name: string,
  icon: {
    viewBox?: string,
    path?: string
  }
};

const Icon = ({ name, icon }: Props) => (
  <SvgIcon viewBox={icon.viewBox}>
    <title>{name}</title>
    <path d={icon.path} />
  </SvgIcon>
);

export default Icon;
