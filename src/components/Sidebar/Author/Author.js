// @flow strict
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styled from 'styled-components';
import { margin, marginBottom } from '../../../utils/get-margin';
import { lineHeight } from '../../../utils/get-line-height';

const Photo = styled.img`
  display: inline-block;
  margin-bottom: 0;
  border-radius: 50%;
  background-clip: padding-box;
`;

const IndexTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.base * 1.125}px;
  font-weight: ${(props) => props.theme.fontWeights.heading};
  ${lineHeight(1.125)}
  ${margin(0.5, 0)}
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.base * 1.125}px;
  font-weight: ${(props) => props.theme.fontWeights.heading};
  ${lineHeight(1.125)}
  ${margin(0.5, 0)}
`;

const TitleLink = styled(Link)`
  color: var(--color-text);
  &:hover,
  &:focus {
    color: var(--color-text);
  }
`;

const Subtitle = styled.p`
  color: var(--color-gray500);
  ${lineHeight(1)}
  ${marginBottom(1)}
`;

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex }: Props) => (
  <div>
    <Link to="/">
      <Photo
        src={withPrefix(author.photo)}
        width="75"
        height="75"
        alt={author.name}
      />
    </Link>

    {isIndex === true ? (
      <IndexTitle>
        <TitleLink to="/">{author.name}</TitleLink>
      </IndexTitle>
    ) : (
        <Title>
          <TitleLink to="/">{author.name}</TitleLink>
        </Title>
    )}
    <Subtitle>{author.bio}</Subtitle>
  </div>
);

export default Author;
