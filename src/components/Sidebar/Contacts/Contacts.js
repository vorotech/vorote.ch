// @flow strict
import React from 'react';
import { getContactHref, getIcon } from '../../../utils';
import Icon from '../../Icon';
import styled from 'styled-components';
import { marginBottom } from '../../../utils/get-margin';
import { lineHeight } from '../../../utils/get-line-height';

const StyledContacts = styled.div`
  ${marginBottom(1)}
`;

const ContactsList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 0;
  flex-shrink: 0;
  list-style: none;
  padding: 0;
  margin: 10px -3px;
  width: 140px;
`;

const ContactsListItem = styled.li`
  padding: 0;
  margin: 4px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.buttons.height}px;
  width: ${props => props.theme.buttons.height}px;
  ${lineHeight(1)}
  border-radius: 50%;
  text-align: center;
  border: 1px solid var(--color-gray300);
`;

const ListItemLink = styled.a`
  border: 0;
  display: flex;
  color: var(--color-text);

  &:hover,
  &:focus {
    color: var(--color-primary);
  }
`;

type Props = {
  contacts: {
    [string]: string,
  },
};

const Contacts = ({ contacts }: Props) => (
  <StyledContacts>
    <ContactsList>
      {Object.keys(contacts).map((name) => (!contacts[name] ? null : (
        <ContactsListItem key={name}>
          <ListItemLink
            href={getContactHref(name, contacts[name])}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name={name} icon={getIcon(name)} />
          </ListItemLink>
        </ContactsListItem>
      )))}
    </ContactsList>
  </StyledContacts>
);

export default Contacts;
