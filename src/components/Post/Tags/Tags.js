// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { marginBottom } from '../../../utils/get-margin';

const StyledTags = styled.div`
  ${marginBottom(0.5)}
`;

const TagsList = styled.ul`
  list-style: none;
  margin: 0 -10px;
  padding: 0;
`;

const TagsListItem = styled.li`
  display: inline-block;
  margin: 10px 5px;
`;

const TagLink = styled(Link)`
  display: inline-block;
  height: ${(props) => props.theme.buttons.height}px;
  padding: 0 24px;
  line-height: ${(props) => props.theme.buttons.height}px;
  border: 1px solid var(--color-gray500);
  text-decoration: none;
  border-radius: ${(props) => props.theme.buttons.borderRadius}px;
  color: var(--color-text);

  &:hover,
  &:focus {
    color: var(--color-primary);
  }
`;

type Props = {
  tags: string[],
  tagSlugs: string[]
};

const Tags = ({ tags, tagSlugs }: Props) => (
  <StyledTags>
    <TagsList>
      {tagSlugs && tagSlugs.map((slug, i) => (
        <TagsListItem key={tags[i]}>
          <TagLink to={slug}>{tags[i]}</TagLink>
        </TagsListItem>
      ))}
    </TagsList>
  </StyledTags>
);

export default Tags;
