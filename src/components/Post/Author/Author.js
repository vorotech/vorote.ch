// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styled from 'styled-components';
import { useSiteMetadata } from '../../../hooks';
import { margin } from '../../../utils/get-margin';
import { lineHeight } from '../../../utils/get-line-height';
import { mediaUp } from '../../../utils/get-media-query';

const StyledAuthor = styled.div`
  border-top: 1px solid var(--color-gray500);
  padding-top: 20px;
  ${lineHeight(1)}
  ${margin(1, 0)}
  ${mediaUp.sm`
    margin-left: auto;
    margin-right: auto;
  `}
`;

const TwitterLink = styled.a`
  display: block;
  text-decoration: underline;
`;

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <StyledAuthor>
      <p>
        {author.bio}
        <TwitterLink
          href={getContactHref('twitter', author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong> on Twitter
        </TwitterLink>
      </p>
    </StyledAuthor>
  );
};

export default Author;
