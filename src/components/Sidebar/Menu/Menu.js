// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { marginBottom } from '../../../utils/get-margin';

const StyledMenu = styled.nav`
  ${marginBottom(1)}
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuListItem = styled.li`
  padding: 0;
  margin: 10px 0;
`;

const ListItemLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSizes.base}px;
  color: var(--color-text);
  font-weight: normal;
  border: 0;

  &:hover,
  &:focus {
    color: var(--color-primary);
    border-bottom: 1px solid var(--color-primary);
  }

  &:.active {
    color: var(--color-text);
    border-bottom: 1px solid var(--color-text);
  }
`;


type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu }: Props) => (
  <StyledMenu>
    <MenuList>
      {menu.map((item) => (
        <MenuListItem key={item.path}>
          <ListItemLink to={item.path} activeClassName='active'>
            {item.label}
          </ListItemLink>
        </MenuListItem>
      ))}
    </MenuList>
  </StyledMenu>
);

export default Menu;
