// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import styled from 'styled-components';
import type { Edges } from '../../types';
import { marginTop, marginBottom } from '../../utils/get-margin';
import { lineHeight } from '../../utils/get-line-height';

const FeedItem = styled.div`
  ${marginTop(1.25)}
  &:last-child {
    ${marginBottom(0.5)}
  }
`;

const MetaTime = styled.time`
  font-size: ${(props) => props.theme.fontSizes.small}px;
  color: var(--color-text);
  font-weight: ${(props) => props.theme.fontWeights.heading};
  text-transform: uppercase;
`;

const MetaDevider = styled.span`
  margin: 0 5px;
`;

const MetaCategoryLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSizes.small}px;
  color: var(--color-secondary);
  font-weight: ${(props) => props.theme.fontWeights.heading};
  text-transform: uppercase;

  &:hover,
  &:focus {
    color: var(--color-primary);
  }
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.base * 1.6875}px;
  ${lineHeight(1.5)}
  margin-top: 0;
  ${marginBottom(0.5)}
`;

const TitleLink = styled(Link)`
  color: var(--color-text);

  &:hover,
  &:focus {
    color: var(--color-text);
    border-bottom: 1px solid var(--color-text);
  }
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontSizes.base}px;
  ${lineHeight(1)}
  ${marginBottom(0.75)}
`;

const ReadMoreLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSizes.base}px;
  color: var(--color-primary);

  &:hover,
  &:focus {
    color: var(--color-primary);
    border-bottom: 1px solid var(--color-primary);
  }
`;

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div>
    {edges.map((edge) => (
      <FeedItem key={edge.node.fields.slug}>
        <div>
          <MetaTime dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}>
            {moment(edge.node.frontmatter.date).format('MMMM YYYY')}
          </MetaTime>
          <MetaDevider />
          <span>
            <MetaCategoryLink to={edge.node.fields.categorySlug}>
              {edge.node.frontmatter.category}
            </MetaCategoryLink>
          </span>
        </div>
        <Title>
          <TitleLink to={edge.node.fields.slug}>{edge.node.frontmatter.title}</TitleLink>
        </Title>
        <Description>{edge.node.frontmatter.description}</Description>
        <ReadMoreLink to={edge.node.fields.slug}>Read post</ReadMoreLink> <span>🕒 {edge.node.fields.readingTime.text}</span>
      </FeedItem>
    ))}
  </div>
);

export default Feed;
