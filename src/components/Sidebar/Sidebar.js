// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styled from 'styled-components';
import { useSiteMetadata } from '../../hooks';
import { mediaUp } from '../../utils/get-media-query';
import { grid } from 'styled-components-grid';
import ColorModeToggler from './ColorModeToggler';

const StyledSidebar = styled.div`
  width: 100%;
  ${grid.unit({ size: { sm: 5/12, md: 1/3 } })}
`;

const SidebarInner = styled.div`
  position: relative;
  padding: 25px 20px 0;

  ${mediaUp.sm`
    padding: 30px 20px 0;
    &:after {
      background: var(--color-gray500);
      background: linear-gradient(to bottom, var(--color-gray500) 0%, var(--color-gray500) 48%, var(--color-background) 100%);
      position: absolute;
      content: '';
      width: 1px;
      height: 540px;
      top: 30px;
      right: -10px;
      bottom: 0;
  `}
`;

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <StyledSidebar>
      <SidebarInner>
        <Author author={author} isIndex={isIndex} />
        <ColorModeToggler />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </SidebarInner>
    </StyledSidebar>
  );
};

export default Sidebar;
